const { Schema, model } = require('mongoose');
var esquema = new Schema(
    {
        NombreCategoria:String,
        ImagenCategoria:String,
        Comercios:[{
            NombreComercio:String,
            ImagenComercio:String,
            BannerComercio:String,
            Calificacion: Number,
            Direccion:String,
            CostoEnvio:Number,
            Horario:String,
            Productos:[{
                NombreProducto:String,
                ImagenProducto:String,
                Descripcion: String,
                Precio:Number
            }]
        }]
        
    }
);

module.exports = model('categorias', esquema );