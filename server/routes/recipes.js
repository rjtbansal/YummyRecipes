const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
/*
Endpoint: /recipes/:id
Outcome: Give recipe details based on id
*/ 
router.get('/:id', (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        if(!err){
            if(recipe)
                res.json(recipe);
            else    
                res.status(404).send('Recipe not found');
        }
        else{
            console.error(err);
        }
    })
});

module.exports = router;

