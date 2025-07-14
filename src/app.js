const express = require('express'); // Importamos Express para montar el servidor
const cors = require('cors');  // Middleware CORS
require('dotenv').config();  // Carga variables de entorno desde .env
const authRouter = require('./routes/auth.routes');
const clasesRouter = require('./routes/clases.routes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

// Habilitamos CORS para permitir peticiones desde el frontend
app.use(cors({
    origin: 'http://localhost:5173', // Dirección del frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use((req, res, next) => {
    console.log(`:flecha_a_la_derecha: ${req.method} ${req.originalUrl}`);
    next();
});

// Middleware para parsear JSON en el body
app.use(express.json());

app.use(express.urlencoded({ extended: true }))

// Prefijo /api/v1/auth rutas de autenticación (login/signup)
app.use('/api/v1/auth', authRouter)

// Prefijo /api/v1/clases rutas CRUD de clases (protegidas con JWT y roles)
app.use('/api/v1/clases', clasesRouter)

// Arranque del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor por el puerto', port)
});

/* Flujo completo de una petición protegida

    Cliente llama GET /api/v1/clases/allclases con cookie JWT automática.

    app.js enruta a clasesRouter.

    validateJWT extrae el token de la cookie, lo verifica con jwt.verify y adjunta req.user.

    validateRole(2) comprueba req.user.role y permite solo Admin.

    Llega a getAllClass en el controlador, que llama a getAllClassesDB.

    getAllClassesDB ejecuta la consulta SQL y devuelve las filas.

    El controlador responde con { ok: true, datos: [...] }.

    Cliente recibe JSON y muestra las tarjetas de clases.*/ 