
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const prodcutos = require('../models/pruebaProducto');


//añadir producto
router.post('/:idComercio/nuevo', function( req, res ){
    prodcutos.insertMany({
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

module.exports = router;