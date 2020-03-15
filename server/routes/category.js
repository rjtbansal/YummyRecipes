const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const Recipe = require('../models/recipe');

/**
 Endpoint: /category/:id
 Outcome: List of recipes belonging to category
 */

 router.get('/:id', (req, res) => {
    const recipesReceived = [];
    Category.findById(req.params.id, 'mealIds', (err, category) => {
        if(!err) {
            if(category) {               
                category.mealIds.forEach(mealId => {
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
 module.exports = router;