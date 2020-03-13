const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const Cuisine = require('./models/cuisine');

const app = express();

const cuisinesApiUrl = `https://www.themealdb.com/api/json/v2/9973533/list.php?a=list`;
const cuisineApiUrl = 'https://www.themealdb.com/api/json/v2/9973533/filter.php?a=';

let cuisinesResponse = [];
const cuisines = [];
const cuisineDetails = [];

axios.get(cuisinesApiUrl)
     .then(res => cuisinesResponse = res.data.meals)
     .then(() => {
         cuisinesResponse = cuisinesResponse.filter(cuisine => cuisine.strArea !== 'Unknown');
         //loop through cuisinesResponse and grab each cuisine and do an axios call to the api
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


const mongoCloudUrl = 'mongodb+srv://admin:adminadmin@yummyrecipescluster-0g9s7.mongodb.net/YummyRecipes?retryWrites=true&w=majority';
mongoose.connect(mongoCloudUrl)
        .then(res => {
            app.listen(3000);
            console.log(mongoose.connection.readyState);
        })
        .catch(err => console.log(err) );
