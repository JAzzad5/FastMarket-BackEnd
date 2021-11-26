
const pruebaProducto = require('../models/pruebaProducto');
const pruebaOrden = require('../models/pruebaOrden');
const { Schema, model } = require('mongoose');
var esquema = new Schema(
    {
        NombreUsuario: String,
        Correo: String,
        Telefono: String,
        Contraseña: String,
        ImagenUsuario: String,
        Ubicacion: { lat: String, lon: String, NombreUbicacion: String},
        Tarjeta: { NombreTarjeta:String, Numero:Number, FechaVencimiento: String, CVV:Number },
        CarritoCompras: [{
            _id: {type: Schema.Types.ObjectId, ref: 'pruebaProducto'},
            Cantidad: Number
        }],
        HistorialOrdenes:[{ type: Schema.Types.ObjectId, ref: 'pruebaOrden' }],
        Estado: String
        
    }
);

module.exports = model('usuarios', esquema );