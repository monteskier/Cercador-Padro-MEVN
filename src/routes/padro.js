const express = require('express');
const router = express.Router();
const Padro = require('../models/Padro');
router.get('/', async(req, res) =>{
        /*const padrons = Padro.findOne({dni:'39383423V'});     
        await console.log(res.json(padrons));*/
    });    
router.post('/find', (req,res )=>{      
    req.body.dni = req.body.dni.toUpperCase();
    Padro.findOne({dni:req.body.dni}, function(err,obj){
        if(err){
            console.log("hi ha un error!!");
            throw(err);
        }else{
            console.log("objeto = "+obj)
            res.json(obj);            
        }
    });
    
});
router.put('/update/:id', async (req, res) =>{
    await Padro.findByIdAndUpdate(req.params.id, {entregat:true})    
    console.log("Registre actualitzat");
    res.json({
        status:"Registre actualizat",
    })
});
router.delete('/:id', async(req, res) =>{
    await Padro.findByIdAndDelete(req.params.id);
    console.log('Registre eliminat');
    res.json({
        status:"Registre Eliminat",
    });
})
module.exports = router;