var exporess = require('express');
var app = exporess();

app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Petición exitosa'
    })
})

module.exports = app;