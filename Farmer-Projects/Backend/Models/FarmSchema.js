const mongoose = require("mongoose");

const FarmSchema = mongoose.Schema({
    Location :{
        "type" : String,
        "required" : true,
        "trim" : true
    },
    AreaSize :{
        "type" :String,
        "required" : true,
        "trim" : true
    },
    Season : {
        "type" : String,
        "required" : true,
        "trim" : true
    },
    SoilType : {
        "type" : String,
        "required" : true,
        "trim" : true
    },
    weatherCondition : {
        "type" : String,
        "required" : true,
        "trim" : true
    },
    Budget : {
        "type" : String,
        "required" : true,
        "trim" : true
    },
    Equipment : {
        "type" : String,
        "required" : true,
        "trim" : true
    },
    waterAvailability : {
        "type" : String,
        "required" : true,
        "trim" : true
    },
    AnnualRainfall : {
        "type" : String,
        "required" : true,
        "trim" : true
    }

})   

const FarmModel = mongoose.model("MyFarm",FarmSchema);
module.exports=FarmModel;
