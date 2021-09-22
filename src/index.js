
const express = require('express');
const morgan = require("morgan");
const mongoose = require("mongoose");

const app =  express();
mongoose.connect('mongodb://localhost/padro-database')
    .then(db=> console.log("La base de datos es conectada") ) 
    .catch(err => console.log(err));
//settings
app.set('port', process.env.PORT || 4000);

//Middlewares "ajudan a processar antes de llegar a los URLS"
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/padro', require('./routes/padro'));

//Static Files

app.use(express.static(__dirname+'/public'))

//Server is lisening
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});


