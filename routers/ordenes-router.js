var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const pruebaOrden = require('../models/pruebaOrden');


//obtener todas las ordenes
router.get('/', function( req, res ){
    pruebaOrden.find()
    .populate({path:'usuario', select: 'NombreUsuario Ubicacion'})
    .populate('motorista')
    .populate(
        {
            path:'productos',populate:{
                path:'_id',
                populate:{
                    path:'Comercio',
                    select: 'NombreComercio ImagenComercio Direccion'
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
router.get('/:idUsuario', function( req, res ){
    pruebaOrden.find({usuario: mongoose.Types.ObjectId(req.params.idUsuario)})
    .populate({path:'usuario', select: 'NombreUsuario Ubicacion'})
    .populate('motorista')
    .populate(
        {
            path:'productos',
            populate:{
                path:'_id',
                populate:{
                    path:'Comercio',
                    select: 'NombreComercio ImagenComercio Direccion'
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
    .populate({path:'usuario', select: 'NombreUsuario Ubicacion'})
    .populate({path:'motorista', select: 'Nombre'})
    .populate(
        {
            path:'productos',
            populate:{
                path:'_id',
                populate:{
                    path:'Comercio',
                    select: 'NombreComercio ImagenComercio Direccion'
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
    .populate({path:'usuario', select: 'NombreUsuario Ubicacion'})
    .populate(
        {
            path:'productos',
            populate:{
                path:'_id',
                populate:{
                    path:'Comercio',
                    select: 'NombreComercio ImagenComercio Direccion'
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


module.exports = router;