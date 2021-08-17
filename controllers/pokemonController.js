//importing express to file
const express = require('express');
//instantiating our router
const router = express.Router();
//const pokemon = require('../pokemon')    //need to make it available to the router
const Pokemon = require('../models').Pokemon;

//get all pokemon and display on the screen
router.get("/", (req, res) => {
    Pokemon.findAll({order:['id']}).then((pokemons) => {
      res.render("index.ejs", {
        pokemon: pokemons,
      });
    });
  });

//show the create new screen
router.get("/new", (req, res) => {
    res.render('new.ejs');
})

router.get("/:id/edit", (req,res) => {
    Pokemon.findByPk(req.params.id).then((pokemon) => {
    res.render("edit.ejs", {
        pokemon: pokemon,
    });
});
});

router.get('/:id', (req, res) => {
    Pokemon.findByPk(req.params.id).then((pokemon) => {
//        console.log('in get id',pokemon,req.params.id);
    res.render('show.ejs', {
        pokemon: pokemon,
        id: req.params.id
    });
});
});

router.post("/new", (req, res) => {
    Pokemon.create(req.body).then((newPokemon) => {
        res.redirect('/pokemon');
    });
});

//edit
router.put('/:id', (req,res) => {
    Pokemon.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      }).then((pokemon) => {
        res.redirect('/pokemon');
      });
    
})

router.delete('/:id', (req,res) => {
    Pokemon.destroy({ where: { id: req.params.id } }).then(() => {
        res.redirect("/pokemon");
      });
    });

module.exports = router;