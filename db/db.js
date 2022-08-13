const mongoose = require('mongoose');
require("dotenv").config();

const url = process.env.MONGO_URL;

const connectDB = () => {
    mongoose.connect(url, {
        useNewUrlParser : true, useUnifiedTopology: true
    });
    console.log("Connected to database...");
}

module.exports = connectDB;