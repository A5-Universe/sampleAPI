const mongoose = require("mongoose");

const connectDB = (uri) => {

    console.log("connect db"); //checking for connect or not
    
    return mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;


