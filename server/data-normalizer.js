const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
// app.post('/cuisines', (req, res) => {

// });

const cuisinesApiUrl = `https://www.themealdb.com/api/json/v2/9973533/list.php?a=list`;
const cuisineApiUrl = 'https://www.themealdb.com/api/json/v2/9973533/filter.php?a=';

let cuisinesResponse = [];
let cuisines = [];
const cuisineDetails = [];
const finalCuisines = [];

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
                    console.log(cuisine);
                    finalCuisines.push(cuisine);
                 })
         })
      })
      .then(() => console.log(finalCuisines))
     .catch(err => console.log(err));


const mongoCloudUrl = 'mongodb+srv://admin:adminadmin@yummyrecipescluster-0g9s7.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoCloudUrl)
        .then(res => {
            app.listen(3000);
        })
        .catch(err => console.log(err) );
