var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const pruebaOrden = require('../models/pruebaOrden');

router.get('/', function( req, res ){
    pruebaOrden.find({})
    .populate('usuario')
    .populate(
        {
            path:'productos',
            populate:{path:'_id'}
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