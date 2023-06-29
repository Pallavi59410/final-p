//Schema
const mongoose = require("mongoose");

const MealtypeSchema = new mongoose.Schema({
name: {type:String},
content: {type:String},
image: {type:String},
meal_type: {type:Number},
});

//model

const MealtypeModel = mongoose.model("mealtype",MealtypeSchema,"mealtypes");

//exports

module.exports = MealtypeModel;