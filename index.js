const express = require('express'); // import express
require('dotenv').config(); // import dotenv
const cors = require('cors'); // import cors

require('dotenv').config(); // import dotenv

const app = express(); // create an instance of express

app.use(cors()); // enable cors

// Lectura y parseo del body
app.use(express.json()); // enable json

// Rutas
app.use('/api/usuarios', require('./routes/usuarioRoutes')); // import routes from usuarios.js

app.listen(process.env.PORT, () => {
    console.log('Ejecutando se en el puerto: ' + process.env.PORT);
});