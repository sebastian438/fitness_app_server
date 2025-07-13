const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRouter = require('./routes/auth.routes');
const clasesRouter = require('./routes/clases.routes');

const app = express();

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

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/auth', authRouter)

app.use('/api/v1/clases', clasesRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor por el puerto', port)
});