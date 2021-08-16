//importing express to file
const express = require('express');
//instantiating our router
const router = express.Router();
const pokemon = require('../pokemon')    //need to make it available to the router

router.get('/', (req, res) => {  
    res.render('index.ejs', {pokemon: pokemon});
});

router.get("/new", (req, res) => {
    res.render('new.ejs');
})

router.get("/:index/edit", (req,res) => {
    res.render("edit.ejs", {
        pokemon: pokemon[req.params.index],index: req.params.index
    })
})

router.get('/:arrayIndex', (req, res) => {
    //    res.send(pokemon[req.params.index]);
    res.render('show.ejs', {
        pokemon: pokemon[req.params.arrayIndex],
        arrIndex: req.params.arrayIndex
    })
});

router.post("/new", (req, res) => {
    pokemon.push(req.body);
    res.redirect('/pokemon');
})

router.put('/:index', (req,res) => {
    pokemon[req.params.index] = req.body;
    res.redirect('/pokemon');
})

router.delete('/:index', (req,res) => {
    pokemon.splice(req.params.index,1);
    res.redirect('/pokemon');
})


module.exports = router;