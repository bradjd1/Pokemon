const express = require("express");
const router = express.Router();

const players = require("../players");

router.get('/', (req,res) => {
    res.render('players/index.ejs');
})

router.get('/signup', (req, res) => {
    res.render('players/signup.ejs');
})

router.get('/login', (req,res) => {
    res.render('players/login.ejs');
})

router.post('/login', (req, res) => {
    let userIndex = players.findIndex(players => players.username == req.body.username && players.password == req.body.password);
    res.redirect(`profile/${userIndex}`)
})

router.get('/profile/:index/edit',(req,res) => {
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
    res.redirect(`/players/profile/${index}`);
})

router.delete('/profiles/:index',(req,res) => {
    players.splice(req.params.index, 1);    //splice(place in array to start deleting, how many to remove)
    res.redirect('/players');     //redirect back to players homepage
})

module.exports = router;