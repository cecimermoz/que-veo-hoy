var conexion = require('../lib/conexionbd');

function getPeliculas (req, res) {

}

function getGeneros (req, res) {
    res.json({
        "generos": [
          {
            "id": 1,
            "nombre_genero": "Action"
          },
          {
            "id": 2,
            "nombre_genero": "Adventure"
          },
          {
            "id": 3,
            "nombre_genero": "Animation"
          },
          {
            "id": 4,
            "nombre_genero": "Biography"
          },
          {
            "id": 5,
            "nombre_genero": "Comedy"
          },
          {
            "id": 6,
            "nombre_genero": "Crime"
          },
          {
            "id": 7,
            "nombre_genero": "Documentary"
          },
          {
            "id": 8,
            "nombre_genero": "Drama"
          },
          {
            "id": 9,
            "nombre_genero": "Family"
          },
          {
            "id": 10,
            "nombre_genero": "Horror"
          },
          {
            "id": 11,
            "nombre_genero": "Mystery"
          },
          {
            "id": 12,
            "nombre_genero": "Romance"
          },
          {
            "id": 13,
            "nombre_genero": "Sci-Fi"
          },
          {
            "id": 14,
            "nombre_genero": "Short"
          },
          {
            "id": 15,
            "nombre_genero": "Thriller"
          }
        ]
      }
      )
    /*
    conexion.query('SELECT * from genero2', (error, results, fields) => {
        if(error){
            res.send(404);
        } else {
            res.json( { generos:results } ) 
        }
    });
    */
}



module.exports = { getPeliculas, getGeneros };
