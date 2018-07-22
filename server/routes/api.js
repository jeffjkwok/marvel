const express = require('express');
const router = express.Router();

const axios = require('axios');
const md5 = require('md5');

const marvelAPI = 'https://gateway.marvel.com';
const publicKey =  '9b6db5904a098ee421c875ff25c6f2ff';
const privateKey = 'ac0ffcc7e14d3c8112b67b6eb388fcc82b56dea2';
const ts = Date.now();
const hash = md5(ts+privateKey+publicKey);


router.get('/', (req,res) => {
    res.send('api works')
});

router.get('/test', (req,res) => {
    axios.get(`${marvelAPI}/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
        .then(result => {
            console.log(result.data.data.results)
            let data = result.data.data.results;
            let count = 0;
            for(item of data){
                count++
            }
            console.log(count)
            // res.status(200).json(result.results);
        })
        .catch( error => {
            res.status(500).send(error);
        });
});

module.exports = router;
