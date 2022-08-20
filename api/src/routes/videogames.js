require('dotenv').config();
const APIKEY = process.env.YOUR_API_KEY;
const { Router } = require('express');
const db = require('../db');
const router = Router();
const axios = require('axios').default;
const { Videogame, Genre } = require('../db');

//TODO -----> GET a "/videogames" <--------
//
router.get('/', async (req, res) => {
    //busco en la DB si tengo juegos creados y me traigo todos
    let videogamesDb = await Videogame.findAll({
        include: Genre
        });       

    //Parseo el objeto
    videogamesDb = JSON.stringify(videogamesDb);
    videogamesDb = JSON.parse(videogamesDb);
    //Aca dejo el arreglo de generos plano con solo los nombres de cada genero(llega array de objetos)
    //console.log(videogamesDb)
    //console.log('aca termina el sin reduce')

    videogamesDb = videogamesDb.reduce((acc, el) => acc.concat({
        ...el, genres: el.genres.map(g => g.name)//Me quedo solo con el nombre de cada genero
    }), [])
    //console.log('aca le aplico el reduce con map convierto el array de objeto de genre en un array')
    //console.log(videogamesDb)
    
    //TODO QUERIES --------> GET /videogames?name="..." <-----------
    // si llegan queries "name" lo agarro por aca

   // req.query.name = "aromon"
    //esto era para probar efectivamente funciona 
    //y me trajo 15 juegos con aromon en su nombre 1 de mi db y 14 de la api
    if (req.query.name) {
        try {
            //busco si existe el juego en la API
            let response = await axios.get(`https://api.rawg.io/api/games?search=${req.query.name}&key=${APIKEY}`);
            if (!response.data.count) return res.status(204).json(`Juego no encontrado "${req.query.name}"`);
            //filtro SOLO la data que necesito para enviarle al front
            const gamesREADY = response.data.results.map(game => {
                return{
                    id: game.id,
                    name: game.name,
                    background_image: game.background_image,
                    rating: game.rating,
                    genres: game.genres.map(g => g.name)
                }
            });
            //como antes me traje TODOS de la base de datos, si entro por queries, solo filtro los que coincidan con la busqueda
            const filteredGamesDb = videogamesDb.filter(g => g.name.toLowerCase().includes(req.query.name.toLowerCase()));
            //doy prioridad a la DB, y sumo todos, y corto el array en 15
            const results = [...filteredGamesDb, ...gamesREADY].splice(0, 15);
            return res.json(results)
        } catch (err) {
            return console.log(err)
        }
    }
    else if (req.query.releaseDate){
        try {
            const date = videogamesDb.filter(d => d.releaseDate.includes(req.query.releaseDate));
            const results1 = [date].splice(0,15);
            return res.json(results1)
            
        } catch (error) {
            return console.log(error)
            
        }
    }


     else  {
        // SI NO ENTRO POT QUERIES --> voy a buscar todos los juegos a la API
        try {
            let pages = 0;
            let results = [...videogamesDb]; //sumo lo que tengo en la DB
            let response = await axios.get(`https://api.rawg.io/api/games?key=${APIKEY}`);
           // console.log(response)
            while (results.length <= 100) {    //paginado!!!
                pages++;
                //filtro solo la DATA que necesito enviar al FRONT
                const gammesREADY = response.data.results //llena la const con lo que hay en esa pagina en la api en ese momento dentro de results que es un arreglo dentro de la api
                .map(game => {    //mapea solo lo que me piden
                    return{
                        id: game.id,
                        name: game.name,
                        background_image: game.background_image,
                        rating: game.rating,
                        genres: game.genres.map(g => g.name)
                    }
                });
                results = [...results, ...gammesREADY] // suma los datos de db + datos api
                //console.log(results.length)
                response = await axios.get(response.data.next) //aca como ya cargo los datos de la pagina actual de la api llama al .next que es una url dentro de la api para que pase a la siguiente pagina para guardar los datos dentro de la pagina 2 de nuestro while
            }
            return res.json(results)
        } catch (err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }
});


router.put('/:id', async (req, res) => {
  
    try {
     let id = req.params.id;
     let { name, description, rating } = req.body;
     await db.Videogame.update(
        {name, description, rating},
        {
            where:{
                id,
            },
        }

     );
     res.status(200).send('videogame actualizado')
    } catch (err) {
        console.log(err);
    }
    })


module.exports = router;


