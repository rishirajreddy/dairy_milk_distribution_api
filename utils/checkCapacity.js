const Order = require("../models/order");

let importedDate;
// module.exports = importedDate;

module.exports = {
    checkCapacityHelper: function(date) {
    const maxMilkCapacity = 90;
    let milkQuantity = [];
    let totalQty = 0;
    return Order.find({createdAt: date})
        .then((orders) => {
            if(orders.length > 0){
                orders.map((order) => {
                    milkQuantity.push(order.milkQuantityInLitres);
                })
                milkQuantity.forEach(qty => {
                    totalQty += qty
                });
                if(totalQty < maxMilkCapacity){
                    return {
                        totalQty: totalQty,
                        data:`${maxMilkCapacity - totalQty}L of milk was unsold for the day ${date}`};
                    }
                else {
                    return {
                        totalQty: totalQty,
                        data:`Max Orders reached!! No more orders for the day`}
                }
            } 
            else {
                return {
                    totalQty: totalQty,
                    data:`No orders found on the given date`}
            }
        })
        .catch(err => {
            console.log(err.message);
            return err.message;
        })
}
}
