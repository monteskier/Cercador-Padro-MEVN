
const express = require('express');
const morgan = require("morgan");
const mongoose = require("mongoose");
const uri = 'mongodb+srv://montoliuaj:wz2UZs93TzYzhLT@cluster0.kroos.mongodb.net/cluster0?retryWrites=true&w=majority';
const app =  express();
/*mongoose.connect('mongodb://localhost/padro-database')*/
mongoose.connect(uri)
    .then(db=> console.log("La base de datos es conectada") ) 
    .catch(err => console.log(err));
//settings
app.set('port', process.env.PORT || 3000);

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


