const { queryDB } = require("./db.query.js");
const bcrypt = require("bcryptjs");

const initDB = async () => {
    try {
        // 1. Borrar tablas (orden importa por las FK)
        await queryDB(`
            DROP TABLE IF EXISTS inscripciones;
            DROP TABLE IF EXISTS sesiones;
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS roles;
            DROP TABLE IF EXISTS profesores;
            DROP TABLE IF EXISTS clases;
            `
        );

        // 2. Crear tablas (igual que tu archivo DBcreate.js)
        await queryDB(`
            CREATE TABLE IF NOT EXISTS roles (
                role_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name_role VARCHAR(60) NOT NULL
            );
            CREATE TABLE IF NOT EXISTS profesores (
                profesor_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name VARCHAR(120) NOT NULL,
                especialidad VARCHAR(120) NOT NULL
            );
            CREATE TABLE IF NOT EXISTS clases (
                class_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                title VARCHAR(120) NOT NULL,
                descripcion VARCHAR(500) NOT NULL,
                capacity INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS users (
                user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                name VARCHAR(120) NOT NULL,
                email VARCHAR(120) UNIQUE NOT NULL,
                role_id INTEGER REFERENCES roles(role_id) ON DELETE CASCADE,
                password_hash VARCHAR(500) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS sesiones (
                sesion_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                session_date DATE NOT NULL,
                class_id INTEGER REFERENCES clases(class_id) ON DELETE CASCADE,
                profesor_id INTEGER REFERENCES profesores(profesor_id) ON DELETE CASCADE
            );

            CREATE TABLE IF NOT EXISTS inscripciones (
                inscripcion_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
                sesion_id INTEGER REFERENCES sesiones(sesion_id) ON DELETE CASCADE
            );

        `);
        // 3. Hashear contraseñas
        const password1 = await bcrypt.hash("Super123", 10);
        const password2 = await bcrypt.hash("Admin123", 10);
        const password3 = await bcrypt.hash("User123", 10);

        // 4. Insertar datos ficticios
        await queryDB(`
            INSERT INTO roles (name_role)
            VALUES 
                ('super'),
                ('admin'),
                ('user');
            
            INSERT INTO profesores (name, especialidad)
            VALUES
                ('Pepe', 'Spinnig'),
                ('Sebas', 'Programacion');
            
            INSERT INTO clases (title, descripcion, capacity)
            VALUES
                ('Yoga', 'Bueno para el movimiento', 20),
                ('Hit', 'Bueno para el corazon', 30);
            
                
            INSERT INTO sesiones (session_date, class_id, profesor_id)
            VALUES
                ('2025-07-05', 1, 1),
                ('2025-07-03', 2, 2);
                
        `);
        await queryDB(`INSERT INTO users (name, email, role_id, password_hash)
                VALUES
                    ('Pepe', 'super@email.com', 1, $1),
                    ('Juan', 'admin@email.com', 2, $2),
                    ('Sebas', 'user@email.com', 3, $3);
                `, [password1, password2, password3]
        );

        await queryDB(`INSERT INTO inscripciones (user_id, sesion_id)
                VALUES
                    (1, 1),
                    (2, 2);
                `
        );

        console.log("Base de datos reiniciada con éxito");

    } catch (error) {
        console.log("Error al inicializar la base de datos:", error);
    }
};

initDB();