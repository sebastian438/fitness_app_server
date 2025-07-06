const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRouter = require('./routes/auth.routes')

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/auth', authRouter)

app.listen(port, () => {
    console.log('Servidor por el puerto', port)
});