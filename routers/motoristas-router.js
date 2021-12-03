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

//Editar Motorista
router.put('/:idMotorista/Editar', function( req, res ){
    motorista.updateOne({
        _id: req.params.idMotorista
    },{
        $set:{
            Nombre: req.body.Nombre,
            Contraseña: req.body.Contraseña,
            Correo: req.body.Correo,
            Estado: req.body.Estado,
            ImagenMotorista: req.body.ImagenMotorista,
            Telefono: req.body.Telefono,
            Placa: req.body.Placa
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

//Cambiar Observacion del motorista (Con orden, Disponible)
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

//Cambiar Estado del motorista (Activo, Inactivo)
router.put('/:idMotorista/:Estado/cambiarEstado', function( req, res ){
    motorista.updateOne({
        _id: req.params.idMotorista
    },{
        $set:{
            Estado: req.params.Estado,
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

//Cambiar Aprobacion del motorista (true, false)
router.put('/:idMotorista/Aprobar', function( req, res ){
    motorista.updateOne({
        _id: req.params.idMotorista
    },{
        $set:{
            Aprobado: true,
            Estado: 'Activo',
            Observacion: 'Disponible'
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

//login motorista
router.get('/:Correo/login', function( req, res ){
    motorista.find({Correo: req.params.Correo},
        {Contraseña:true, Aprobado:true })
    .then( result =>{
        res.send(result);
        res.end();
    })
    .catch( error =>{
        res.send(error);
        res.end();
    });
});

//eliminar motorista
router.delete('/:idMotorista/eliminar', function( req, res ){
    motorista.deleteOne({
            _id: req.params.idMotorista
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

