var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const comercios = require('../models/comercios');
var servicioCategorias = require('../routers/categorias-router');

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


//añadir comercio
router.post('/nuevo', function( req, res ){
    comercios.insertMany({
        NombreComercio:req.body.NombreComercio,
        ImagenComercio:req.body.ImagenComercio,
        BannerComercio:req.body.BannerComercio,
        Calificacion:req.body.Calificacion,
        Direccion:req.body.Direccion,
        CostoEnvio:req.body.CostoEnvio,
        Horario:req.body.HoraInicio + ' - ' + req.body.HoraFinal,
        Productos: [],
        Ubicacion: {
            lat:0,
            lon:0,
            NombreUbicacion: ""
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


//Insertar productos de una comercio 
router.post('/:idComercio/agregarProducto/:idProducto', function( req, res ){
    comercios.updateOne({
        _id: req.params.idComercio,
    },{
        $push:{
            Productos:{
                _id: mongoose.Types.ObjectId(req.params.idProducto)
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



//Obtener un comercio
router.get('/:idComercio', function( req, res ){
    comercios.find({_id: req.params.idComercio})
    .then( result =>{
        res.send(result[0]);
        res.end();
    })
    .catch( error =>{
        res.send(error);
        res.end();
    });
});


//Obtener productos de un comercio 
router.get('/:idComercio/productos', function( req, res ){
    comercios.find({
        _id: req.params.idComercio
    },
    {Productos:true})
    .populate({
        path: 'Productos'
    })
    .then( result =>{
        res.send(result[0]);
        res.end();
    })
    .catch( error =>{
        res.send(error);
        res.end();
    });
});

module.exports = router;