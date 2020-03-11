function getAllPeliculas(req, res){
    res.json({peliculas:[{id:1, titulo:"Narc"}]});
}

module.exports = { getAllPeliculas };