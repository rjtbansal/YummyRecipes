const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const recipesRoutes = require('./routes/recipes');
const categoryRoutes = require('./routes/category');
const cuisineRoutes = require('./routes/cuisine');
const mongoUrl = require('./mongo-url.json');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/recipes',recipesRoutes);
app.use('/category', categoryRoutes);
app.use('/cuisine', cuisineRoutes);


//connecting to our cloud MongoDb
const mongoCloudUrl = mongoUrl["mongodbUrl"];

const port = process.env.PORT || 3000;
//2nd arg options are required to remove deprecated warnings
mongoose.connect(mongoCloudUrl, {useUnifiedTopology: true, useNewUrlParser: true})
        .then(res => {
            app.listen(port);
        })
        .catch(err => console.log(err) );