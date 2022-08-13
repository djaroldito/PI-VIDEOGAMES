
require('dotenv').config();
const APIKEY = process.env.YOUR_API_KEY;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Genre } = require('../db');

try {

axios.get(`https://api.rawg.io/api/genres?key=${APIKEY}`).then((response)=>{
    let aux = response.data.results.map((ge)=>{
        const obj = {
            name: ge.name,
        };
        return obj
     });
     genres.bulkCreate(aux)
     res.json({msg: "Succes"});
});
}catch(e){
    console.log('e');
}









       
