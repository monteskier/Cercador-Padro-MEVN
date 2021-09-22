const mongoose = require('mongoose');
const {Schema} = mongoose; 

const Padro = new Schema({
    dni: String,
    edat:Number,
    entregat:Boolean,
});

module.exports = mongoose.model('Padro',Padro);
