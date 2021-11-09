const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const pruebaProducto = require('../models/pruebaProducto');
var esquema = new Schema(
    {
        NombreComercio:String,
        ImagenComercio:String,
        BannerComercio:String,
        Calificacion:Number,
        Direccion:String,
        CostoEnvio:Number,
        Horario:String,
        Productos: [{ type: Schema.Types.ObjectId, ref: 'pruebaProducto' }],
        
    }
);

module.exports = model('comercios', esquema );