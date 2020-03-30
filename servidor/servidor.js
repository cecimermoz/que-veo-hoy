//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controller = require('./controladores/controller');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get("/peliculas", controller.getPeliculas);
<<<<<<< HEAD
app.get("/generos", controller.getGeneros);

=======
app.get("/generos", controller.getGeneros);/* 
app.get("/peliculas/:id", controller.getPelicula);
 */
>>>>>>> 3d83919df074812cdf9c6ca8f5aefb05d3ea19ff
//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

