const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    _id: String,
    name: String,
    category: String,
    cuisine: String,
    instructions: String,
    image: String,
    ingredients: Array,  //will be an array of objects {ingredientName : portionSize}
    addedBy: String
});

module.exports = mongoose.model('Recipe', recipeSchema);