var conexion = require('../lib/conexionbd');

function getPeliculas (req, res) {
    let anio = req.query.anio;
    let genero = req.query.genero;
    let titulo = req.query.titulo;
    let orden = req.query.columna_orden;
    let tipo = req.query.tipo_orden;
    let cantidad = req.query.cantidad;
    let pagina = req.query.pagina;
    let sql = 'SELECT * FROM pelicula';
    let countSql = 'SELECT count(*) as total FROM pelicula';
    let parametros = [];
    if (anio && genero && titulo) {
        sql += ' WHERE genero_id = ? AND anio = ? AND titulo LIKE ? ';
        countSql += ' WHERE genero_id = ? AND anio = ? AND titulo LIKE ? ';
        parametros = [parseInt(genero), parseInt(anio), '%' + titulo + '%'];
    } else if (anio && genero) {
        sql += ' WHERE anio = ? AND genero_id = ?';
        countSql += ' WHERE anio = ? AND genero_id = ?';
        parametros = [parseInt(anio), parseInt(genero)];
    } else if (anio && titulo) {
        sql += ' WHERE anio = ? AND titulo LIKE ?';
        countSql += ' WHERE anio = ? AND titulo LIKE ?';
        parametros = [parseInt(anio), '%' + titulo + '%'];
    } else if (genero && titulo) {
        sql += ' WHERE genero_id = ? AND titulo LIKE ?';
        countSql += ' WHERE genero_id = ? AND titulo LIKE ?';
        parametros = [parseInt(genero), '%' + titulo + '%'];
    } else if (anio) {
        sql += ' WHERE anio = ?';
        countSql += ' WHERE anio = ?';
        parametros = [parseInt(anio)];
    } else if (genero) {
        sql += ' WHERE genero_id = ?';
        countSql += ' WHERE genero_id = ?';
        parametros = [parseInt(genero)];
    } else if (titulo) {
        sql += " WHERE titulo LIKE ?";
        countSql += " WHERE titulo LIKE ?";
        parametros = ['%' + titulo + '%'];
    }
    if (orden && tipo) {
        sql += ' ORDER BY ' + orden + ' ' + tipo;
    }
    if (cantidad && parseInt(pagina) >= 1) {
        let offset = (parseInt(pagina) - 1) * parseInt(cantidad);
        sql += ' LIMIT ? OFFSET ? ';
        parametros.push(parseInt(cantidad));
        parametros.push(offset);
    }
    console.log(sql);
    console.log(countSql);
    console.log(parametros);
    conexion.query(
        sql,
        parametros,
        (error, results, fields) => {
        if (error) console.error(error);
        conexion.query(
            countSql,
            parametros,
            (error, resultsCount, fields) => {
            if (error) console.error(error);
            res.json({ peliculas: results, total: resultsCount[0].total });
            }
        );
        }
    )
}

function getGeneros (req, res) {
    conexion.query('SELECT * from genero2', (error, results, fields) => {
        if(error){
            res.send(404);
        } else {
            res.json( { generos:results } ) /* Genera por cada resultado, una posición de array en formato de objeto */
        }
    });
}

function getPelicula (req, res) {
    let idPelicula = req.params.idpelicula;
    conexion.query("SELECT * from pelicula WHERE id = ?",
    [idPelicula], (error, peliculas, fields) => {
        if(error){
            res.send(404);
            console.log("Error en Id Pelicula");
        } 
        if(peliculas.length > 0){
            let pelicula = peliculas[0];
            let generoId = pelicula.genero_id;

             conexion.query("SELECT * from genero2 WHERE id = ?",
            [generoId], (error, generos, fields) => {
                if(error){
                    res.send(404);
                    console.log("Error en Genero Pelicula");
                }
                let genero = generos[0];
 
                 conexion.query("SELECT a.* FROM actor_pelicula ap JOIN actor a ON a.id = ap.actor_id WHERE ap.pelicula_id = ?", 
                [idPelicula], (error , actores, fields) => {
                    if(error){
                        res.send(404);
                        console.log("Error en el actor_pelicula");
                    } 
                    res.json ({ 
                        pelicula: pelicula, 
                        actores: actores,
                        genero: genero 
                    
                  });
                 }
              );
            }
          );          
        } else {
            res.status(404).send();
        }
    }
  );
}
/* 
function getRecomendacion (req, res) {
    let genero = req.query.genero;
    let anio_inicio = req.query.anio_inicio;
    let anio_fin = req.query.anio_fin;
    let puntuacion = req.query.puntuacion;
    
}

 */
module.exports = { getPeliculas, getGeneros, getPelicula, getRecomendacion};


