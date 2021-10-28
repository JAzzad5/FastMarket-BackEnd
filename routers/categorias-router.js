var express = require('express');
var router = express.Router();
var categoria = require('../models/categoria');
var mongoose = require('mongoose');

//Obtener Motorista
router.get('/', function( req, res ){
    categoria.find()
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