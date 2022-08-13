const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const {format} = require('date-fns');

const Order = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId
    },
    customerName: {
        type: String,
        required:true
    },
    milkQuantityInLitres: {
        type: Number
    },
    shippingAddress: {
        type:String
    },
    pricePerLitre: {
        type: Number
    },
    paymentMethod: {
        type:String
    },
    deliveryDate: {
        type:String
    },
    orderStatus: {
        type:String
    },
    finalPrice:{
        type: Number
    },
    createdAt: {
        type:String,
        default: format(new Date(), 'dd-MM-yyyy')
    },
    updatedAt: {
        type:String,
        default: format(new Date(), 'dd-MM-yyyy')
    }
})

Order.plugin(uniqueValidator);
module.exports = mongoose.model("order", Order);