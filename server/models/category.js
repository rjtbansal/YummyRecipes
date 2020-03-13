const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,
    image: String,
    description: String,
    mealIds: Array
});

module.exports = mongoose.model('Category', categorySchema);