/* A standalone script that calls mealdb api, grabs the data and manipulates it as per our project requirements
before pushing into MongoDb.*/ 

const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const Cuisine = require('./models/cuisine');
const Category = require('./models/category');
const Recipe = require('./models/recipe');

const app = express();

const cuisinesApiUrl = `https://www.themealdb.com/api/json/v2/9973533/list.php?a=list`;
const cuisineApiUrl = 'https://www.themealdb.com/api/json/v2/9973533/filter.php?a=';
const categoriesApiUrl = `https://www.themealdb.com/api/json/v2/9973533/categories.php`;
const categoryApiUrl = `https://www.themealdb.com/api/json/v2/9973533/filter.php?c=`;

let cuisinesResponse = [];
const cuisines = [];
const cuisineDetails = [];

let categoriesResponse = [];
const categories = [];

/**
 * below function calls categories api and adds in mealIds specific to that category
 */
const generateCategoriesCollection = () => {
    axios.get(categoriesApiUrl)
     .then(res => categoriesResponse = res.data.categories )
     .then(() => {
         categoriesResponse = categoriesResponse.filter(category => category.strCategory !== 'Miscellaneous');
         categoriesResponse.forEach(categoryResponse => {
             categories.push({
                 name: categoryResponse.strCategory,
                 image: categoryResponse.strCategoryThumb,
                 description: categoryResponse.strCategoryDescription,
                 mealIds: []
             })
         })
     })
     .then(() => {
         categories.forEach(category => {
            axios.get(`${categoryApiUrl}${category.name}`)
                 .then(res => {
                     res.data.meals.forEach(meal => category.mealIds.push(meal.idMeal))
                     const myCategory = new Category({
                         name: category.name,
                         image: category.image,
                         description: category.description,
                         mealIds: category.mealIds
                     });
                     myCategory.save()
                               .then(result => console.log(result))
                               .catch(err => console.log(err));
                 })
                 .catch(err => console.log(err));
         })
     })
     .catch(err => console.log(err));
}

// below function calls API for areas that gives out cuisines and mealIds was added for each cuisine
const generateCuisinesCollection = () => {
    axios.get(cuisinesApiUrl)
        .then(res => cuisinesResponse = res.data.meals)
        .then(() => {
            cuisinesResponse = cuisinesResponse.filter(cuisine => cuisine.strArea !== 'Unknown');
            cuisinesResponse.forEach(cuisineResponse => {
                cuisines.push({name: cuisineResponse.strArea, mealIds:[]})
            })
        })
        .then(() => {
            cuisines.forEach(cuisine => {
                axios.get(`${cuisineApiUrl}${cuisine.name}`)
                    .then(res => {
                        res.data.meals.forEach(meal => {
                            cuisine.mealIds.push(meal.idMeal);
                        })
                        const myCuisine = new Cuisine({
                            name: cuisine.name,
                            mealIds: cuisine.mealIds
                        }) 
                        myCuisine.save()
                                .then(result => console.log('saved'))
                                .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err))
            })
        })
        .catch(err => console.log(err));
}

const recipeDetailsApiUrl = `https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=`;

//below method goes through each mealID in cuisines collection and calls the api to get the 
//meal details. The function manipulates those details to generate recipes collection 
const generateRecipesListFromCuisines = () => {
    const recipeIds = [];
    let ingredients = [];
    let mealList = [];
    Category.find()
            .then(categories => {
                categories.forEach(category => {
                    category.mealIds.forEach(mealId => recipeIds.push(mealId));
                })
                recipeIds.sort().forEach(recipeId => {
                    axios.get(`${recipeDetailsApiUrl}${recipeId}`)
                        .then(res => {
                            //console.log(res.data.meals);
                            res.data.meals.forEach(meal => {
                                for(let i=1; i<=20; i++){
                                    if(meal[`strIngredient${i}`]){
                                       // console.log(meal[`strIngredient${i}`]);
                                        ingredients.push({ name: meal[`strIngredient${i}`], 
                                                           portionSize: meal[`strMeasure${i}`]});
                                    }
                                    else{
                                        meal.ingredients = ingredients;
                                        ingredients = [];
                                        break;
                                    }
                                }
                                const recipe = new Recipe({
                                    _id: meal.idMeal,
                                    name: meal.strMeal,
                                    category: meal.strCategory,
                                    cuisine: meal.strArea,
                                    instructions: meal.strInstructions,
                                    image: meal.strMealThumb,
                                    ingredients: meal.ingredients
                                });
                                recipe.save()
                                .then(result => console.log(result))
                                .catch(err => console.log(err));
                            })                           
                        });
                })
            })
            .catch(err => console.log(err));
}

//generateRecipesListFromCuisines();


const mongoCloudUrl = 'mongodb+srv://admin:adminadmin@yummyrecipescluster-0g9s7.mongodb.net/YummyRecipes?retryWrites=true&w=majority';
mongoose.connect(mongoCloudUrl)
        .then(res => {
            app.listen(3000);
        })
        .catch(err => console.log(err) );
