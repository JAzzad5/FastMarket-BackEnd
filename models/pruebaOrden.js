const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const pruebaProducto = require('../models/pruebaProducto');
const usuarios = require('../models/usuario');

var esquema = new Schema(
    {
        productos: [{
            cantidad: Number,
            _id:  [{ type: Schema.Types.ObjectId, ref: 'pruebaProducto' }],
        }],
        usuario: [{ type: Schema.Types.ObjectId, ref: 'usuarios' }],
        fecha: String,
        motorista: String,
        
    }
);

module.exports = model('pruebaOrden', esquema );