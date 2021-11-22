const { Schema, model } = require('mongoose');
const comercio = require('../models/comercios');
var esquemaProducto = new Schema(
    {
        NombreProducto: String,
        ImagenProducto: String,
        Descripcion: String,
        Precio: Number,
        Comercio: [{ type: Schema.Types.ObjectId, ref: 'comercios' }],
    }
);

module.exports = model('pruebaProducto', esquemaProducto );