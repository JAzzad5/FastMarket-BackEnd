var mongoose = require('mongoose');
var esquema = new mongoose.Schema(
    {
        Nombre: String
    }
);

module.exports = mongoose.model('motoristas', esquema);