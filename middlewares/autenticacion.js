var jwt = require('jsonwebtoken');
var config = require('../config/config');

// Verificar Token
exports.verificaToken = function(req, res, next) {
    var token = req.query.token;
    jwt.verify(token, config.SEED, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token no valido',
                errors: err
            })
        }

        req.usuario = decode.usuario;
        next();
    })
}