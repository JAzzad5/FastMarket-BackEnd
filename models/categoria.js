var mongoose = require('mongoose');
var esquema = new mongoose.Schema(
    {
        NombreCategoria: String
    }
);

module.exports = mongoose.model('categorias', esquema);