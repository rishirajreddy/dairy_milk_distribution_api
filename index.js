const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require("./db/db");
const orderRoutes = require('./routes/order_routes');

connectDB();
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json({extended: false}));

app.use("/", orderRoutes);

module.exports = app;