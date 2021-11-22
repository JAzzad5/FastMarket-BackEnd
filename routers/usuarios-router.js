var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const usuario = require('../models/usuario');

//Obtener usuarios
router.get('/', function( req, res ){
    usuario.find()
    .then(result=>{
        res.send(result);
        res.end()
    })
    .catch(error=>{
        res.send(error);
        res.end()
    })
});

//Obtener un usuario
router.get('/:idUsuario', function( req, res ){
    usuario.find({
        _id: req.params.idUsuario
    })
    .then(result=>{
        res.send(result[0]);
        res.end()
    })
    .catch(error=>{
        res.send(error);
        res.end()
    })
});

//Obtener ubicacion de un usuario
router.get('/:idUsuario/ubicacion', function( req, res ){
    usuario.find({
        _id: req.params.idUsuario
    },
    {Ubicacion:true})
    .then(result=>{
        res.send(result);
        res.end()
    })
    .catch(error=>{
        res.send(error);
        res.end()
    })
});

//Obtener tarjeta un usuario
router.get('/:idUsuario/tarjeta', function( req, res ){
    usuario.find({
        _id: req.params.idUsuario
    },
    {Tarjeta:true})
    .then(result=>{
        res.send(result);
        res.end()
    })
    .catch(error=>{
        res.send(error);
        res.end()
    })
});

//Obtener el carrito de compras un usuario
router.get('/:idUsuario/carrito', function( req, res ){
    usuario.find({
        _id: req.params.idUsuario
    },{ CarritoCompras: true})
    .populate({
        path: 'CarritoCompras',
        populate:{
            path:'IdProducto',
            populate: {path:'Comercio'}
        }   
    })
    .then(result=>{
        res.send(result);
        res.end()
    })
    .catch(error=>{
        res.send(error);
        res.end()
    })
});

//Obtener el Historial de ordenes de un usuario
router.get('/:idUsuario/historial', function( req, res ){
    usuario.find({
        _id: req.params.idUsuario
    },{ HistorialOrdenes: true})
    .populate({
        path:'HistorialOrdenes',
        populate: {
            path: 'productos',
            populate: '_id'
        }
    })
    .populate({
        path:'HistorialOrdenes',
        populate: {
            path: 'motorista',
        }
    })
    .then(result=>{
        res.send(result);
        res.end()
    })
    .catch(error=>{
        res.send(error);
        res.end()
    })
});

//Actualizar datos generales usuario
router.put('/:idUsuario/perfil', function( req, res ){
    usuario.updateOne({
        _id: req.params.idUsuario
    },{
        $set:{
            NombreUsuario: req.body.NombreUsuario,
            Correo: req.body.Correo,
            Telefono: req.body.Telefono,
            Contraseña: req.body.Contraseña,
            ImagenUsuario: req.body.ImagenUsuario,
            }
    })
    .then(result=>{
        res.send(result);
        res.end()
    })
    .catch(error=>{
        res.send(error);
        res.end()
    })
});


//Actualizar Ubicacion
router.put('/:idUsuario/ubicacion', function( req, res ){
    usuario.updateOne({
        _id: req.params.idUsuario
    },{
        $set:{
            Ubicacion:{
                X: req.body.X,
                Y: req.body.Y,
                NombreUbicacion: req.body.NombreUbicacion
            }
        }
    })
    .then(result=>{
        res.send(result);
        res.end()
    })
    .catch(error=>{
        res.send(error);
        res.end()
    })
});

//Actualizar Tarjeta
router.put('/:idUsuario/tarjeta', function( req, res ){
    usuario.updateOne({
        _id: req.params.idUsuario
    },{
        $set:{
            Tarjeta:{
                NombreTarjeta:req.body.NombreTarjeta,
                Numero:req.body.Numero,
                FechaVencimiento:req.body.FechaVencimiento,
                CVV:req.body.CVV
            }
        }
    })
    .then(result=>{
        res.send(result);
        res.end()
    })
    .catch(error=>{
        res.send(error);
        res.end()
    })
});

//Añadir al carrito de compras del usuario
router.post('/:idUsuario/agregarProducto', function( req, res ){
    usuario.updateOne({
        _id: req.params.idUsuario
    },{
        $push:{
            CarritoCompras:{
                _id: mongoose.Types.ObjectId(),
                Comercio: req.body.Comercio,
                Producto: req.body.Producto,
                Cantidad: req.body.Cantidad,
                Subtotal: req.body.Subtotal,
                CostoE: req.body.Costo,
                Total: req.body.Total,
            }
        }
    })
    .then(result=>{
        res.send(result);
        res.end()
    })
    .catch(error=>{
        res.send(error);
        res.end()
    })
});

//Añadir al historial de ordenes del usuario
router.post('/:idUsuario/agregarOrdenHistorial', function( req, res ){
    usuario.updateOne({
        _id: req.params.idUsuario
    },{
        $push:{
            HistorialOrdenes:{
                _id: mongoose.Types.ObjectId(),
                Comercio: req.body.Comercio,
                Producto: req.body.Producto,
                Cantidad: req.body.Cantidad,
                Subtotal: req.body.Subtotal,
                CostoEnvio: req.body.CostoEnvio,
                Total: req.body.Total,
                Id_Motorista: req.body.Id_Motorista,
                Direccion: req.body.Direccion,
                Estado: req.body.Estado,
            }
        }
    })
    .then(result=>{
        res.send(result);
        res.end()
    })
    .catch(error=>{
        res.send(error);
        res.end()
    })
});

//Añadir Usuario a la coleccion de usuarios
router.post('/nuevo', function( req, res ){
    usuario.insertMany({
        NombreUsuario: req.body.NombreUsuario,
        Correo: req.body.Correo,
        Telefono: req.body.Telefono,
        Contraseña: req.body.Contraseña,
        ImagenUsuario:"",
        Ubicacion: {
            X:"",
            Y:"",
            NombreUbicacion: ""
        },
        Tarjeta: {
            NombreTarjeta: "",
            Numero: "",
            FechaVencimiento: "",
            CVV:""
        },
        CarritoCompras:[],
        HistorialOrdenes:[],
        Estado:"Activo"
    })
    .then(result=>{
        res.send(result);
        res.end()
    })
    .catch(error=>{
        res.send(error);
        res.end()
    })
});

module.exports = router;