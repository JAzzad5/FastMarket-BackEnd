const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const pruebaProducto = require('../models/pruebaProducto');
const usuarios = require('../models/usuario');
const motoristas = require('../models/motorista');

var esquema = new Schema(
    {
        productos: [{
            Cantidad: Number,
            _id:  { type: Schema.Types.ObjectId, ref: 'pruebaProducto' },
        }],
        usuario: {type: Schema.Types.ObjectId, ref: 'usuarios' },
        fecha: String,
        motorista: [{ type: Schema.Types.ObjectId, ref: 'motoristas' }],
        estado: String
    }
);

module.exports = model('pruebaOrden', esquema );