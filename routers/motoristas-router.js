var express = require('express');
var router = express.Router();
var motorista = require('../models/motorista');
var mongoose = require('mongoose');

//Obtener Motorista
router.get('/', function( req, res ){
    motorista.find()
    .populate(
        {
            path:'HistorialOrdenes',
            populate:{
                path:'_id',
                populate:{
                    path:'productos',
                    populate:{
                        path: '_id'
                    }
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

