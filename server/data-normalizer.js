const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const Cuisine = require('./models/cuisine');
const Category = require('./models/category');
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



const mongoCloudUrl = 'mongodb+srv://admin:adminadmin@yummyrecipescluster-0g9s7.mongodb.net/YummyRecipes?retryWrites=true&w=majority';
mongoose.connect(mongoCloudUrl)
        .then(res => {
            app.listen(3000);
        })
        .catch(err => console.log(err) );
