// Requieres
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

// Inicializar variables
var app = express();

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/hospitaldb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión'));
db.once('open', () => {
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
})

//rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});