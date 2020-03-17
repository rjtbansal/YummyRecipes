const express = require('express');
const router = express.Router();
const Cuisine = require('../models/cuisine');
const Recipe = require('../models/recipe');

/**
 Endpoint: /cuisine/:id
 Outcome: List of recipes belonging to a particular cuisine
 */

 router.get('/:id', (req, res) => {
    const recipesReceived = [];
    Cuisine.findById(req.params.id, 'mealIds', (err, cuisine) => {
        if(!err) {
            if(cuisine) {               
                cuisine.mealIds.forEach(mealId => {
                    Recipe.findById(mealId, 'name category cuisine image' , (err, recipe) => {
                        recipesReceived.push(recipe);
                    });
                });
                setTimeout(() => res.json(recipesReceived), 200);
            }
        }
        else {
            console.error(err);
        }
  });
 });

 /**
 Endpoint: /cuisine/
 Outcome: List of all cuisines
 */
router.get('/', (req, res) => {
    Cuisine.find({}, (err, cuisines) => {
        if(!err){
            if(cuisines){
                res.json(cuisines);
            }
        }
        else{
            console.error(err);
        }
    })
 });
 module.exports = router;
