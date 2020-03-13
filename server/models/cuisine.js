const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cuisineSchema = new Schema({
    name: String,
    mealIds: Array
});

module.exports = mongoose.model('Cuisine', cuisineSchema);