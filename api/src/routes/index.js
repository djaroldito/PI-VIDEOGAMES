require('dotenv').config();
const { Router } = require('express');
const router = Router();
const APIKEY = process.env.YOUR_API_KEY
//Importo todos los routers;
const videogames = require('./videogames.js');
const videogame = require('./videogame.js');
const genres = require('./genres.js');

//Configuro todos los routers
router.use('/', videogames);
router.use('/', genres);
router.use('/', videogame);

// router.get('/', (req, res) => {
//     res.send('<h1>Hello World!</h1>')
// });

module.exports = router;




