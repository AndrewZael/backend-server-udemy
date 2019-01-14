// Requieres
var express = require('express');
var mongoose = require('mongoose');

// Inicializar variables
var app = express();

// Conexion a la base de datos
mongoose.connect('mongodb://localhost:27017');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión'));
db.once('open', () => {
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
})

//rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Petición exitosa'

    })
})

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});