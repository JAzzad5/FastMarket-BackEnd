var express = require('express');
var router = express.Router();
var motorista = require('../models/motorista');
var mongoose = require('mongoose');

//Obtener todos los Motoristas
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


//Obtener  Motoristas por ID
router.get('/:idMotorista', function( req, res ){
    motorista.find({_id: req.params.idMotorista})
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

//Cambiar Observacion del motorista
router.put('/:idMotorista/:Observacion/cambiarObservacion', function( req, res ){
    motorista.updateOne({
        _id: req.params.idMotorista
    },{
        $set:{
            Observacion: req.params.Observacion,
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

