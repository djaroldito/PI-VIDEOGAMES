require('dotenv').config();
const { Router } = require('express');
const router = Router();
const APIKEY = process.env.YOUR_API_KEY
//Importo todos los routers;
const videogames = require('./videogames.js');
const videogame = require('./videogame.js');
const genres = require('./genres.js');
const released = require('./released')

//Configuro todos los routers
router.use('/videogames', videogames);
router.use('/genres', genres);
router.use('/videogame', videogame);
router.use('/released', released)

module.exports = router;




