const express = require("express");
const router = express.Router();

const users = require("../models/players");

router.get('/', (req,res) => {
    res.render('players/index.ejs');
})

router.get('/signup', (req, res) => {    //remember order - we want new to come before fruits/index so we add it up here
    res.render('players/signup.ejs');
})

module.exports = router;