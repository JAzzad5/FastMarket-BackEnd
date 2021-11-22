var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const categoria = require('../models/categoria');

//Obtener todas las categorias 
router.get('/', function( req, res ){
    categoria.find()
    .populate({
        path: 'Comercios',
        populate: {path: 'Productos'}
    })
    .then( result =>{
        res.send(result);
        res.end();
    })
    .catch( error =>{
        res.send(error);
        res.end();
    });
});

//Obtener una categoria 
router.get('/:idCategoria', function( req, res ){
    categoria.find({
        _id: req.params.idCategoria
    })
    .populate({
        path: 'Comercios',
        populate: {path: 'Productos'}
    })
    .then( result =>{
        res.send(result);
        res.end();
    })
    .catch( error =>{
        res.send(error);
        res.end();
    });
});

//Obtener comercios de una categoria 
router.get('/:NombreCategoria/comercios', function( req, res ){
    categoria.find({
        NombreCategoria: req.params.NombreCategoria
    },
    {Comercios:true})
    .populate({
        path: 'Comercios',
        populate: {path: 'Productos'}
    })
    .then( result =>{
        res.send(result);
        res.end();
    })
    .catch( error =>{
        res.send(error);
        res.end();
    });
});

//Insertar comercio de una categoria 
router.post('/:nombreCategoria/agregarComercio/:idComercio', function( req, res ){
    categoria.updateOne({
        NombreCategoria: req.params.nombreCategoria
    },{
        $push:{
            Comercios:{
                _id: mongoose.Types.ObjectId(req.params.idComercio)
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

module.exports = router;