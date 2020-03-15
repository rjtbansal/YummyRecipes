const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const recipesRoutes = require('./routes/recipes');
const categoryRoutes = require('./routes/category');
const cuisineRoutes = require('./routes/cuisine');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/recipes',recipesRoutes);
app.use('/category', categoryRoutes);
app.use('/cuisine', cuisineRoutes);


//connecting to our cloud MongoDb
const mongoCloudUrl = 'mongodb+srv://admin:adminadmin@yummyrecipescluster-0g9s7.mongodb.net/YummyRecipes?retryWrites=true&w=majority';
//2nd arg options are required to remove deprecated warnings
mongoose.connect(mongoCloudUrl, {useUnifiedTopology: true, useNewUrlParser: true})
        .then(res => {
            app.listen(3000);
        })
        .catch(err => console.log(err) );