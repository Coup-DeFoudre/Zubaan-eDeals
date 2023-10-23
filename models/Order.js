const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userid: {type : String, required: true},
    products: [{
        productid: {type : String, required: true},
        quantity: {type : Number, default: 1}
    }],
    status: {type : String, default: 'pending'},
    address: {type : String, required: true},
    amount: {type : Number, required: true},
}, {timestamps: true});
mongoose.models = {};
module.exports = mongoose.model('Order', OrderSchema);