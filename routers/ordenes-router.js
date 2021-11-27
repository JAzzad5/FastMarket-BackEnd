var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const pruebaOrden = require('../models/pruebaOrden');


//obtener todas las ordenes
router.get('/', function( req, res ){
    pruebaOrden.find()
    .populate({path:'usuario'})
    .populate('motorista')
    .populate(
        {
            path:'productos',populate:{
                path:'_id',
                populate:{
                    path:'Comercio',
                    select: 'NombreComercio ImagenComercio Direccion Ubicacion'
                }
            }
        }
    )
    .then( result =>{
        res.send(result);
        res.end();
    })
    .catch( error =>{
        res.send(error);
        res.end();
    });
});


//obtener ordenes de usuario
router.get('/usuario/:idUsuario', function( req, res ){
    pruebaOrden.find({usuario: mongoose.Types.ObjectId(req.params.idUsuario)})
    .populate({path:'usuario'})
    .populate('motorista')
    .populate(
        {
            path:'productos',
            populate:{
                path:'_id',
                populate:{
                    path:'Comercio',
                    select: 'NombreComercio ImagenComercio Direccion Ubicacion'
                }
            }
        }
    )
    .then( result =>{
        res.send(result);
        res.end();
    })
    .catch( error =>{
        res.send(error);
        res.end();
    });
});

//obtener ordenes de motoristas
router.get('/motorista/:idMotorista', function( req, res ){
    pruebaOrden.find({motorista: mongoose.Types.ObjectId(req.params.idMotorista)})
    .populate({path:'usuario'})
    .populate({path:'motorista', select: 'Nombre'})
    .populate(
        {
            path:'productos',
            populate:{
                path:'_id',
                populate:{
                    path:'Comercio',
                    select: 'NombreComercio ImagenComercio Direccion Ubicacion CostoEnvio'
                }
            }
        }
    )
    .then( result =>{
        res.send(result);
        res.end();
    })
    .catch( error =>{
        res.send(error);
        res.end();
    });
});


//obtener ordenes de disponibles
router.get('/disponibles', function( req, res ){
    pruebaOrden.find({motorista:null})
    .populate({path:'usuario'})
    .populate(
        {
            path:'productos',
            populate:{
                path:'_id',
                populate:{
                    path:'Comercio',
                    select: 'NombreComercio ImagenComercio Direccion Ubicacion CostoEnvio'
                }
            }
        }
    )
    .then( result =>{
        res.send(result);
        res.end();
    })
    .catch( error =>{
        res.send(error);
        res.end();
    });
});

//obtener ordenes por id
router.get('/:id', function( req, res ){
    pruebaOrden.find({_id: mongoose.Types.ObjectId(req.params.id)})
    .populate({path:'usuario'})
    .populate('motorista')
    .populate(
        {
            path:'productos',
            populate:{
                path:'_id',
                populate:{
                    path:'Comercio',
                    select: 'NombreComercio ImagenComercio Direccion Ubicacion CostoEnvio'
                }
            }
        }
    )
    .then( result =>{
        res.send(result);
        res.end();
    })
    .catch( error =>{
        res.send(error);
        res.end();
    });
});

let date = new Date()
let dia = date.getDate()
let mes = date.getMonth() + 1
let anio = date.getFullYear()

// Añadir nueva orden 
router.post('/nuevaOrden', function( req, res ){
    pruebaOrden.insertMany({
        productos: [],
        usuario: mongoose.Types.ObjectId(req.body.usuario),
        fecha: (dia + "/" + mes + "/" + anio),
        motorista: null,
        estado: "Pendiente"
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

//Añadir los productos de la orden
router.post('/:idOrden/agregarProducto', function( req, res ){
    pruebaOrden.updateOne({
        _id: req.params.idOrden,
    },{
        $push:{
            productos:{
                _id: mongoose.Types.ObjectId(req.body._id),
                Cantidad: req.body.Cantidad
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

//tomar orden
router.put('/:idOrden/:idMotorista/tomarOrden', function( req, res ){
    pruebaOrden.updateOne({
        _id: req.params.idOrden
    },{
        $set:{
            motorista: mongoose.Types.ObjectId(req.params.idMotorista),
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

//cambiar estado de la orden
router.put('/:idOrden/:estado/cambiarEstado', function( req, res ){
    pruebaOrden.updateOne({
        _id: req.params.idOrden
    },{
        $set:{
            estado: req.params.estado,
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
module.exports = router;