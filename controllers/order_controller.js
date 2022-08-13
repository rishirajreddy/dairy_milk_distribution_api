const { default: mongoose } = require('mongoose');
const Order  = require("../models/order");
const {format} = require("date-fns");
const {checkCapacityHelper} = require("../utils/checkCapacity");

exports.addOrder = async(req,res) => {
    const {customerName, milkQuantityInLitres, shippingAddress, pricePerLitre, paymentMethod, deliveryDate,orderStatus} = req.body;

    const maxMilkQuantity = 90;
    let totalMilkQty = checkCapacityHelper(format(new Date(), "dd-MM-yyyy"));
    var milkQuantity;
    totalMilkQty.then((qty) => {
        //Checking if the quantity exceeds the maxLimit
        //if yes, no more orders can be placed
        if(qty.totalQty+milkQuantityInLitres > maxMilkQuantity){
            return res.status(200).json("Cannot place order as max orders for the day has exceded")
        }else {
            //orders can be placed
        const order = new Order({
            customerId: new mongoose.Types.ObjectId,
            customerName: customerName,
            milkQuantityInLitres:milkQuantityInLitres,
            shippingAddress: shippingAddress,
            pricePerLitre: pricePerLitre,
            paymentMethod:paymentMethod,
            finalPrice: pricePerLitre * milkQuantityInLitres,
            deliveryDate: deliveryDate,
            orderStatus: orderStatus 
        })
        order.save()
            .then((savedOrder) => {
                console.log("Order Placed");
                res.status(200).json({
                    msg:"Order Placed",
                    order: savedOrder
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err.message})
            })
        }
    })

}

exports.updateOrder = async(req,res) => {
    const {customerName, milkQuantityInLitres, shippingAddress, pricePerLitre, paymentMethod, deliveryDate,orderStatus} = req.body;
    const order = await Order.findOne({_id: req.params.id});
    const preMilkQty = order.get('milkQuantityInLitres');
    const prePricePerL = order.get('pricePerLitre');
    
    let finalPrice;
    
    if(milkQuantityInLitres == null && pricePerLitre != null){
        finalPrice = preMilkQty * pricePerLitre;
    }
    if(pricePerLitre == null && milkQuantityInLitres != null){
        finalPrice = prePricePerL * milkQuantityInLitres;
    }
    if(milkQuantityInLitres === null && pricePerLitre === null){
        return; 
    }


    Order.updateOne({_id: req.params.id}, 
        {
            $set: {
                customerName: customerName,
                deliveryDate : deliveryDate,
                milkQuantityInLitres: milkQuantityInLitres,
                shippingAddress:shippingAddress,
                pricePerLitre: pricePerLitre,
                paymentMethod: paymentMethod,
                finalPrice: finalPrice,
                updatedAt: format(new Date(), 'dd-MM-yyyy')
            }
        }
        )
        .then((result) => {
            if(result.modifiedCount > 0){
                res.status(200).json({msg:"Order details Updated"})
            }else {
                res.status(500).json({msg:"Order not found"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:err.message})
        })
}

exports.updateOrderStatus = async(req,res) => {
    const orderStatus = ["placed", "packed","dispatched","deleivered"]
    const order = await Order.findOne({_id: req.params.id});
    
    let preOrderStatus = order.get('orderStatus');

    const modifiedOrderStatus = req.body.orderStatus;
    let status = false;

    if(orderStatus.includes(modifiedOrderStatus)){
        status = true
    }

    Order.updateOne({_id: req.params.id}, 
        {
            $set: {
                orderStatus: status ? modifiedOrderStatus : preOrderStatus 
            }
        }
        )
        .then((order) => {
            if(status){
                res.status(200).json({msg:`Order Status Updated to ${modifiedOrderStatus}`})
            }
            if(!status){
                res.status(500).json({msg:`Order Status Invalid. Use the below status names to update`, statuses:orderStatus})
            }if(order.modifiedCount <= 0 && order.matchedCount <= 0) {
                res.status(404).json({msg:"Order not found"})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err:err.message});
        })
}

exports.deleteOrder = async(req,res) => {
    Order.deleteOne({_id: req.params.id},
        {
            $pull: {
                _id: req.params.id
            }
        }
        )
        .then((deletedOrder) => {
            if(deletedOrder.deletedCount > 1){
                console.log(deletedOrder);
                res.status(200).json({msg:"Order Deleted"})
            }else {
                res.status(404).json({msg:"Order not found"})
            }
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json({msg:err.message})
        })
}

//max capacity = 90
//if overall capacity of milk ordered in the same day exceeds the max Capacity
//capacity exceed
//else return the left milk i.e max-capacity -  totalMilkInLitres

exports.checkCapacity = async(req,res) => {
    
    //calling the helper function in the utils folder
    let message = checkCapacityHelper(req.params.date);
    message.then((msg) => {
        res.status(200).json(msg.data);
    });

}