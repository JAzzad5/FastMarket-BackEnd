var express = require('express');
var router = express.Router();
var motorista = require('../models/motorista');
var mongoose = require('mongoose');

//Obtener Motorista
router.get('/', function( req, res ){
    motorista.find()
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