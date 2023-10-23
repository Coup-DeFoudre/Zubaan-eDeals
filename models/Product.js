const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title : {type : String, required: true},
    description : {type : String, required: true},
    slug: {type : String, required: true, unique: true},
    img: {type : String, required: true},
    category: {type : String, required: true},
    size: {type : String, required: true},
    color: {type : String, required: true},
    price: {type : Number, required: true},
    availableQty: {type : Number, required: true},
}, {timestamps: true});

mongoose.models = {};
module.exports = mongoose.model('Product', ProductSchema);
