const { Schema, model } = require('mongoose');
var esquema = new Schema(
    {
        NombreUsuario: String,
        Correo: String,
        Telefono: String,
        Contraseña: String,
        ImagenUsuario: String,
        Ubicacion: { X: String, Y: String, NombreUbicacion: String},
        Tarjeta: { NombreTarjeta:String, Numero:String, FechaVencimiento: String, CVV:String },
        CarritoCompras: [{
            Comercio:String,
            Producto:String,
            Cantidad:Number,
            Subtotal:Number,
            CostoEnvio:Number,
            Total:Number,
        }],
        HistorialOrdenes:[{
            Comercio:String,
            Producto:String,
            Cantidad:Number,
            Subtotal:Number,
            CostoEnvio:Number,
            Total:Number,
            Id_Motorista:String,
            Direccion:String,
            Estado:String,
        }],
        Estado: String
        
    }
);

module.exports = model('usuarios', esquema );