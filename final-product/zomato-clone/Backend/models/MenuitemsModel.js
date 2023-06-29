//schema

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const menuitemsSchema = new mongoose.Schema({
name: {type:String},
description: {type:String},
ingridients: {type:Array},
restaurantId: {type:ObjectId},
image: {type:String},
qty: {type:Number},
price:{type:Number},
});
//model

const MenuitemsModel = mongoose.model("menuitem",menuitemsSchema,"menuitems");

//export

module.exports = MenuitemsModel;