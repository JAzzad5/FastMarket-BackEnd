const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const pruebaOrden = require('../models/pruebaOrden');

var esquema =  new Schema(
    {
        Nombre: String,
        Contraseña: String,
        Correo: String,
        Estado: String,
        HistorialOrdenes: [{
            _id:[{type: mongoose.Schema.Types.ObjectId, ref:'pruebaOrden'}]
        }],
        ImagenMotorista: String,
        Observacion: String,
        OrdenesTomadas: [{type: mongoose.Schema.Types.ObjectId, ref:'pruebaOrden'}],
        Telefono: String,
        Aprobado: Boolean
    }
);

module.exports = model('motoristas', esquema);