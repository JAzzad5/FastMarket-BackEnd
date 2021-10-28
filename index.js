
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var database = require('./modules/database');
var usuariosRouter = require('./routers/usuarios-router');
var motoristasRouter = require('./routers/motoristas-router');
var categoriasRouter = require('./routers/categorias-router');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/usuarios', usuariosRouter);
app.use('/motoristas', motoristasRouter);
app.use('/categorias', categoriasRouter);


app.listen(8888, function () {
    console.log("Se levantó el servidor")
})