const jwt = require('jsonwebtoken');

//generatedJwt crea un token firmado con la clave secreta.
const generatedJwt = async ({ uid, email, role }) => {
    try {
        const privateKey = process.env.JWT_SECRET;
        const playload = { uid, email, role };
        const token = jwt.sign(playload, privateKey, { expiresIn: '2h' });
        return token;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    generatedJwt
};