const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    storedId : {type: mongoose.Schema.Types.ObjectId , ref: 'Store'},
    categoryName: String, 
    categoryImage:{type: String, default:'https://cdn5.vectorstock.com/i/1000x1000/32/14/user-sign-icon-person-symbol-human-avatar-vector-12693214.jpg'},
    priority: Number,

});

module.exports = mongoose.model('Category',categorySchema);