const express = require('express');

const app = express();  //create an instance of express called app
const methodOverride = require('method-override');  //used for form to be able to edit and delete

//create a pokemon array
const pokemon = [
    {
        name: "Bulbasaur",
        img: "http://img.pokemondb.net/artwork/bulbasaur.jpg"
    },
    {
        name: "Ivysaur",
        img: "http://img.pokemondb.net/artwork/ivysaur.jpg"
    },
    {
        name: "Venusaur",
        img: "http://img.pokemondb.net/artwork/venusaur.jpg"
    },
    {
        name: "Charmander",
        img: "http://img.pokemondb.net/artwork/charmander.jpg"
    },
    {
        name: "Charizard",
        img: "http://img.pokemondb.net/artwork/charizard.jpg"
    },
    {
        name: "Squirtle",
        img: "http://img.pokemondb.net/artwork/squirtle.jpg"
    },
    {
        name: "Wartortle",
        img: "http://img.pokemondb.net/artwork/wartortle.jpg"
    }
];

//Middleware
app.use(express.urlencoded({ extended: true }));  //this gives you the body of the request in a nice format, can then console log it to see input
app.use((req, res, next) => {      //runs on all routes so put it at top
    // console.log(`run for all routes: ${req.method} ${req.url}`);  //simple way to do basic logging
    let logStr = `${req.method} ${req.url}`;
    if (req.body) {
        logStr += ` input data is: ${JSON.stringify(req.body)}`;
    }
    console.log(logStr);
    next();                     //will go on to other routes
})

app.use(methodOverride('_method'));
// app.get('/pokemon',(req,res) => {
//     res.send(pokemon);

// })

app.get('/pokemon/', (req, res) => {
    //    res.send(pokemon[req.params.index]);
    res.render('index.ejs', { pokemon: pokemon });
});

app.get("/pokemon/new", (req, res) => {
    res.render('new.ejs');
})

app.get("/pokemon/:index/edit", (req,res) => {
    res.render("edit.ejs", {
        pokemon: pokemon[req.params.index],index: req.params.index
    })
})

app.get('/pokemon/:arrayIndex', (req, res) => {
    //    res.send(pokemon[req.params.index]);
    res.render('show.ejs', {
        pokemon: pokemon[req.params.arrayIndex],
        arrIndex: req.params.arrayIndex
    })
});

app.post("/pokemon/new", (req, res) => {
    pokemon.push(req.body);
    res.redirect('/pokemon');
})

app.put('/pokemon/:index', (req,res) => {
    pokemon[req.params.index] = req.body;
    res.redirect('/pokemon');
})

app.delete('/pokemon/:index', (req,res) => {
    pokemon.splice(req.params.index,1);
    res.redirect('/pokemon');
})

app.listen(3000, () => {
    console.log("I am listening");
});