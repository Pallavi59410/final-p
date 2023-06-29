const express = require("express");
const APIRoutes = express.Router();
const location = require("../Controller/Locationcontroller");
const restaurant = require("../Controller/Restaurantcontroller");
const mealtype = require("../Controller/Mealtypecontroller");
const {
    genOrderDetails,
    verifyPayment,
} = require("../Controller/Paymentcontroller");

APIRoutes.get("/api",location.home);
APIRoutes.get("/api/get-location-list", location.getLocationList);
APIRoutes.get("/api/get-restaurantlist-locationid/:loc_id", restaurant.getRestaurantlistLocationId);
APIRoutes.get("/api/get-restaurantdetails-restoid/:id", restaurant.getRestaurantdetailsRestoId);
APIRoutes.get("/api/get-menuitems-restoid/:r_id", restaurant.getMenuitemsRestoId);
APIRoutes.get("/api/get-meal-type-list", mealtype.getMealtypeList);
APIRoutes.post("/api/filter",restaurant.getFilter);

// payment
APIRoutes.post("/api/gen-order-details", genOrderDetails);
APIRoutes.post("/api/verify-payment", verifyPayment);
module.exports = APIRoutes;