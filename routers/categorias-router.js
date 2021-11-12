var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const categoria = require('../models/categoria');

//Obtener todas las categorias 
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

//Obtener una categoria 
router.get('/:idCategoria', function( req, res ){
    categoria.find({
        _id: req.params.idCategoria
    })
    .then( result =>{
        res.send(result);
        res.end();
    })
    .catch( error =>{
        res.send(error);
        res.end();
    });
});

//Obtener comercios de una categoria 
router.get('/:NombreCategoria/comercios', function( req, res ){
    categoria.find({
        NombreCategoria: req.params.NombreCategoria
    },
    {Comercios:true})
    .then( result =>{
        res.send(result);
        res.end();
    })
    .catch( error =>{
        res.send(error);
        res.end();
    });
});

//Insertar comercio de una categoria 
router.post('/:nombreCategoria/agregarComercio', function( req, res ){
    categoria.updateOne({
        NombreCategoria: req.params.nombreCategoria
    },{
        $push:{
            Comercios:{
                _id: mongoose.Types.ObjectId(),
                NombreComercio: req.body.NombreComercio, 
                ImagenComercio: req.body.ImagenComercio, 
                BannerComercio: req.body.BannerComercio, 
                Calificacion: req.body.Calificacion, 
                Direccion: req.body.Direccion, 
                CostoEnvio: req.body.CostoEnvio, 
                Horario: req.body.Horario, 
                Productos:[]
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

//Insertar productos de una comercio 
router.post('/:nombreCategoria/:idComercio/agregarProducto', function( req, res ){
    categoria.updateOne({
        NombreCategoria: req.params.nombreCategoria,
        "Comercios._id": mongoose.Types.ObjectId(req.params.idComercio)
    },{
        $push:{
            "Comercios.$.Productos":{
                _id: mongoose.Types.ObjectId(),
                NombreProducto: req.body.NombreProducto,
                ImagenProducto: req.body.ImagenProducto,
                Descripcion: req.body.Descripcion,
                Precio: req.body.Precio
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
router.get('/:nombreCategoria/:idComercio/', function( req, res ){
    categoria.find({
        NombreCategoria: req.params.nombreCategoria,
        "Comercios._id": mongoose.Types.ObjectId(req.params.idComercio)
    },
    {"Comercios.$":true})
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
router.get('/:nombreCategoria/:idComercio/productos', function( req, res ){
    categoria.find({
        NombreCategoria: req.params.nombreCategoria,
        "Comercios._id": mongoose.Types.ObjectId(req.params.idComercio)
    },
    {"Comercios.$":true})
    .then( result =>{
        res.send(result[0].Comercios[0].Productos);
        res.end();
    })
    .catch( error =>{
        res.send(error);
        res.end();
    });
});

//Obtener un producto
router.get('/:nombreCategoria/:idComercio/:idProductos', function( req, res ){
    categoria.find({
        NombreCategoria: req.params.nombreCategoria,
        "Comercios._id": mongoose.Types.ObjectId(req.params.idComercio)
    },
    {"Comercios.$":true})
    .then( result =>{
        let productos = result[0].Comercios[0].Productos;
        let productoSeleccionado = "";
        productos.forEach(producto => {
            if (producto._id == req.params.idProductos){
                this.productoSeleccionado = producto;
            }
        });
        res.send(this.productoSeleccionado);
        this.productoSeleccionado ="";
        res.end();
    })
    .catch( error =>{
        res.send(error);
        res.end();
    });
});



module.exports = router;