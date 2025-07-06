const bcrypt = require("bcryptjs")
const {
    findUserByEmail,
    findUserById,
    saveNewUser,
    updateUserById,
    deleteUserById
} = require('../models/users.models.js');
const { generatedJwt } = require("../utils/generate.jwt.js");

// Pruebas
// const usuario = "user"
// const passwd = "1234"


const login = async (req, res) => {
    const { email, password } = req.body;

    //Llamada a la bese de datos
    try {
        //1.Buscar el usuario por email
        const user = await findUserByEmail(email);

        //2. Si no existe el usuario
        if (!user) {
            return res.status(401).json({
                error: "Contraseña o usuario incorrecto"
            });
        }

        //3. Si sí existe comparar contraseña con bcrypt
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({
                error: "Contraseña o usuario incorrecto"
            });
        }

        //4. Generar token si todo coincide jwt
        const token = await generatedJwt({
            uid: user.user_id,
            email: user.email,
            role: user.role_id
        });

        //5. Respuesta exitosa
        return res.status(200).json({
            message: "Login correcto",
            token,
            user: {
                id: user.user_id,
                role: user.role_id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        console.log("Error en login:", error);
        return res.status(500).json({
            error: "Errores interno del servidor"
        });
    }
};

const signup = async (req, res) => {
    const { name, email, role, password } = req.body;

    try {
        //Verificar si el usuario ya existe
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                error: "El usuario ya existe"
            });
        }

        //Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await saveNewUser({
            name,
            email,
            role,
            password: hashedPassword
        });

        //Enviar token y datos del usuraio
        return res.status(201).json({
            message: 'Usuario registrado con éxito',
            // token,
            user: {
                id: newUser.user_id,
                email: newUser.email,
                role: newUser.role_id,
                name: newUser.name
            }
        })

    } catch (error) {
        console.log("Error en registro:", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }

};


module.exports = { login, signup };