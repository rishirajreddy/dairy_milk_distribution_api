const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require("./db/db");
const orderRoutes = require('./routes/order_routes');

connectDB();
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json({extended: false}));

app.get("/", (req,res) => {
    res.send({routes: {
        "/add": "adding order",
        "/update/:id": "updating orders",
        "/updateStatus/:id":"updating order status",
        "/delete/:id":"deleting orders",
        "/checkCapacity/:data": "checking milk capacity for the day"
    }})
})

app.use("/", orderRoutes);

module.exports = app;