var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const comercios = require('../models/comercios');

router.get('/', function( req, res ){
    comercios.find({})
    .populate('Productos')
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