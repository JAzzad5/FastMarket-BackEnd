const { Schema, model } = require('mongoose');
const comercios = require('../models/comercios');
var esquema = new Schema(
    {
        NombreCategoria:String,
        ImagenCategoria:String,
        Comercios: [{ type: Schema.Types.ObjectId, ref: 'comercios' }],
        
    }
);

module.exports = model('categorias', esquema );