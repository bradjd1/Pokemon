const express = require("express");
const router = express.Router();

const users = require("../models/players");

router.get('/', (req,res) => {
    res.render('players/index.ejs');
})

module.exports = router;