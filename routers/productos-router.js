
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const productos = require('../models/pruebaProducto');

//Obtener un producto
router.get('/:idProducto', function( req, res ){
    productos.find({_id: req.params.idProducto})
    .then( result =>{
        res.send(result[0]);
        res.end();
    })
    .catch( error =>{
        res.send(error);
        res.end();
    });
});

//añadir producto
router.post('/:idComercio/nuevo', function( req, res ){
    productos.insertMany({
        NombreProducto: req.body.NombreProducto,
        ImagenProducto: req.body.ImagenProducto,
        Descripcion: req.body.Descripcion,
        Precio: req.body.Precio,
        Comercio: mongoose.Types.ObjectId(req.params.idComercio),
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

//Actualizar producto
router.put('/:idProducto/editar', function( req, res ){
    productos.updateOne({
        _id: req.params.idProducto
    },{
        $set:{
            NombreProducto: req.body.NombreProducto,
            ImagenProducto: req.body.ImagenProducto,
            Descripcion : req.body.Descripcion ,
            Precio: req.body.Precio
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

//eliminar producto
router.delete('/:idProducto/eliminar', function( req, res ){
    productos.remove({
            _id: req.params.idProducto
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