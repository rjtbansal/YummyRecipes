const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

/*
Endpoint: /recipes/random
Outcome: Get top 20 random recipes: only provide images
*/ 
router.get('/random', (req, res) => {
    Recipe.aggregate([
        { $project: {name: 1, cuisine: 1, category: 1, image: 1}},
        { $sample: {size: 15}}
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
Endpoint: /recipes/byusers
Outcome: Get all uploaded recipes
*/ 
router.get('/byusers', (_req, res) =>{
    //specifically looking for recipes added by guest
    Recipe.find({ addedBy: 'guest'}, (err, recipes) => {
        if(!err) {
            
            recipes.length ? res.json(recipes) : res.status(404).send('Recipes not found');
        }
        else{
            console.error(err);
        }
    })
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



/*
Endpoint: /recipes
Outcome: Add recipe 
*/ 
router.post('/', (req, res) => {
    if(req.body.name && req.body.ingredients && req.body.instructions){
        const newRecipeData = new Recipe({
            _id: req.body._id,
            name: req.body.name,
            ingredients: req.body.ingredients.split(','),
            instructions: req.body.instructions,
            cuisine: req.body.cuisine || '',
            image: req.body.image || '',
            addedBy: req.body.addedBy || ''
        });
       
        newRecipeData.save()
                     .then(result => {
                         res.status(201).send('Recipe added successfully!');
                     })
                     .catch(err => console.log(err));
    }
    else {
        res.status(400).send('Data is malformed. Required fields are missing');
    }
    
});




module.exports = router;

