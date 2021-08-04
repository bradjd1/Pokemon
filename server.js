const express = require('express');

const app = express();  //create an instance of express called app

app.listen(3000, ()=>{
    console.log("I am listening");
});