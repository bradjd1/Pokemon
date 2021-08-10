const express = require("express");
const router = express.Router();

const players = require("../models/players");

router.get('/', (req,res) => {
    res.render('players/index.ejs');
})

router.get('/signup', (req, res) => {    //remember order - we want new to come before fruits/index so we add it up here
    res.render('players/signup.ejs');
})

router.get('/profile/:index/edit',(req,res) => {
    console.log('in edit')
    res.render('players/editProfile.ejs',{
        player: players[req.params.index],
        index: req.params.index
    })
})

router.get('/profile/:index',(req,res) => {
    res.render('players/profile.ejs',{
        player: players[req.params.index],
        index: req.params.index
    })
})

router.post("/", (req, res) => {
    players.push(req.body);
    let index = players.length - 1
    res.redirect(`/players/profile/${index}`);   //redirect to the fruits get
})


module.exports = router;