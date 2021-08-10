const express = require('express');

const app = express();  //create an instance of express called app
const methodOverride = require('method-override');  //used for form to be able to edit and delete

//Middleware
app.use(express.static("public"));
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
app.use('/pokemon', require('./controllers/pokemonController'));
app.use('/players', require('./controllers/playersController'));

app.listen(3000, () => {
    console.log("I am listening");
});