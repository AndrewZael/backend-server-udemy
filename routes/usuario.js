var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var mdAutenticacion = require('../middlewares/autenticacion');


//encriptr datos
var bcrypt = require('bcryptjs');

var Usuario = require('../models/usuario');


// Obtener todos los usuario
app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre email img role')
        .exec((err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuarios',
                    errors: err
                })
            }
            res.status(200).json({
                ok: true,
                usuarios: usuarios
            });
        });

});

// Verificar Token  Se puede dejar aqui para bloquear las peticiones que estan mas abajo
/*app.use('/', (req, res, next) => {
    var token = req.query.token;
    jwt.verify(token, config.SEED, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token no valido',
                errors: err
            })
        }

        next();
    })
})*/

// Crear un nuevo usuario
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuariotoken: req.usuario
        })
    });

})


// Actualizar usuario
app.put('/:id', mdAutenticacion.verificaToken, (req, res, next) => {

    var id = req.params.id;
    var body = req.body

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al encontrar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id' + id + ' no exite',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ';)';

            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            })

        })

    });
})

// Eliminar Usuario
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioEliminado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al eliminar usuario',
                errors: err
            });
        }

        if (!usuarioEliminado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con el id: ' + id,
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioEliminado
        })


    })
})

module.exports = app;