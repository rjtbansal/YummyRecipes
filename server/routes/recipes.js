const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');


/*
Endpoint: /recipes/random
Outcome: Get top 10 random recipes: only provide images
*/ 
router.get('/random', (req, res) => {
    Recipe.aggregate([
        { $project: {name: 1, cuisine: 1, image: 1}},
        { $sample: {size: 20}}
    ], (err, recipesData) => {
        if(!err) {
            if(recipesData) {
                res.json(recipesData);
            }
            else{
                res.status(404).send('Recipe data not found');
            }
        }
        else {
            console.log(err);
        }
    } );
});

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

