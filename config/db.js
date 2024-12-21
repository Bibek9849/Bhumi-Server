const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/db_bhumi_marketplace_system");
        console.log("MongoDb Connected")
    }catch(e){
        console.log("MongoDb not connected");

    }
}

module.exports = connectDB;
