const express = require('express');
const router = express.Router();

const axios = require('axios');
const md5 = require('md5');
const redis = require('redis');

const marvelAPI = 'https://gateway.marvel.com';
const publicKey =  '9b6db5904a098ee421c875ff25c6f2ff';
const privateKey = 'ac0ffcc7e14d3c8112b67b6eb388fcc82b56dea2';
const ts = Date.now();
const hash = md5(ts+privateKey+publicKey);

const REDIS_URL = process.env.REDIS_URL;
const client = redis.createClient(REDIS_URL);

client.on('connect', () => {
    console.log(`Connected to Redis`);
});
client.on('error', err => {
    console.log(`Error: ${err}`);
});


router.get('/characters/', (req,res) => {
    client.get('page1', (err, obj) => {
        if(obj){
            return res.json(JSON.parse(obj))
        }
        axios.get(`${marvelAPI}/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
        .then(result => {
            client.set('page1', JSON.stringify(result.data.data), (err, result)=>{
                if(err){ console.log(err) };
            });
            res.json(result.data.data);
        })
        .catch( error => {
            res.send(error);
        });
    })
});

router.get('/characters/:offset', (req,res) => {
    let int = Number(req.params.offset) + 1;
    client.get('page' + int, (err, obj)=>{
        if(obj){
            return res.json(JSON.parse(obj))
        }
        let offset = req.params.offset*20;
        axios.get(`${marvelAPI}/v1/public/characters?offset=` + offset + `&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
            .then(result => {
                client.set('page' + int, JSON.stringify(result.data.data.results), (err, result)=>{
                    if(err){ console.log(err) };
                });
                let data = result.data.data.results;
                res.json(data);
            })
            .catch( error => {
                res.send(error);
            });
    })
});


router.get('/character/:id', (req,res) => {
    client.get(req.params.id, (err, obj)=> {
        if(obj){
            return res.json(JSON.parse(obj))
        }
        axios.get(`${marvelAPI}/v1/public/characters/` + req.params.id + `?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
            .then(result => {
                client.set(req.params.id, JSON.stringify(result.data.data.results), (err, result)=>{
                    if(err){ console.log(err) };
                });
                let data = result.data.data.results;
                res.json(data);
            })
            .catch( error => {
                res.send(error);
            })
    })
});

router.get('/characters/:id/:query', (req,res) => {
    axios.get(`${marvelAPI}/v1/public/characters/`+ req.params.id + `/` + req.params.query +`?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
        .then(result => {
            let data = result.data.data.results;
            res.json(data);
        })
        .catch( error => {
            res.send(error);
        });
});

router.post('/character/update/:id', (req, res) => {
    client.get("comments-" + req.params.id, (err,obj)=>{
        let json;
        if(obj){
            json = JSON.parse(obj);
            res.json(JSON.parse(obj))
        } else {
            json = {comments: []};
        }
        json.comments.push(req.body);
        client.set("comments-" + req.params.id, JSON.stringify(json), (err,result) => {
            if(err){ console.log(err)};
        })
    })
})

module.exports = router;
