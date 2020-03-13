const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cuisineSchema = new Schema({

    name: String,
    mealId: String
});

module.exports = mongoose.model('Cuisine', cuisineSchema);