const { request, response } = require("express");
const MenuitemsModel = require("../models/MenuitemsModel")
const RestoModel = require("../models/RestoModel");

module.exports.getRestaurantlistLocationId = async (request, response) => {
    let {loc_id} = request.params;
    try{
        let filter = {location_id: loc_id};
        let projection = {name:1, city:1, image:1, locality:1, locality_id:1, city_id:1};
        let restaurantId = await RestoModel.find(filter, projection); //({}, {name:1},{city:1})
        let sendData = {
            status: restaurantId.length ===0? false : true,
            restaurantId,
            count: restaurantId.length,
        };
        response.status(200).send(sendData);
    } catch (error){
        let errorObj = { status: false, error };
        response.status(500).send(errorObj); 
    }
};

module.exports.getRestaurantdetailsRestoId = async (request, response) => {
    let { id } = request.params;
    try{
        let restaurantId = await RestoModel.findById(id); //({}, {name:1},{city:1})
        let sendData = {
            status: restaurantId.length ===0? false : true,
            restaurantId,
            count: restaurantId.length,
        };
        response.status(200).send(sendData);
    } catch (error){
        let errorObj = { status: false, error };
        response.status(500).send(errorObj); 
    }
};

module.exports.getMenuitemsRestoId = async (request,response) => {
    let { r_id } = request.params;
    try{
        let menuitemlist = await MenuitemsModel.find({ restaurantId: r_id });
        let sendData = {
            status: menuitemlist.length === 0? false : true,
            menuitemlist,
            count: menuitemlist.length,
        };  
        response.status(200).send(sendData);
    } catch (error){
        let errorObj = { status: false, error};
        response.status(500).send(errorObj);
    }
};

module.exports.getFilter = async(request, response) => {
    
    try{
        let { mealType, cuis, loca_id, lCost, hCost, sort,page} = request.body;
        page = page ? page : 1;
        let filter = {}; //{} - get all data

        const itemsPerPage = 2;
        let startIndex = itemsPerPage * page - itemsPerPage;
        let endIndex = itemsPerPage * page;
        if(mealType !== undefined) filter['mealtype_id'] = mealType;
        if(loca_id !== undefined) filter['location_id'] = loca_id;
        if(cuis !== undefined) filter['cuisine'] = cuis;
        if(lCost !== undefined && hCost !== undefined) {
            filter['min_price'] = { $lt:hCost, $gt:lCost};
        }
        console.log(filter);


        let restaurantlist = await RestoModel.find(filter).sort({min_price:sort,});
        let sendData = {
            status: restaurantlist.length ===0? false : true,
            restaurantlist,
            count: restaurantlist.length,
        };
        response.status(200).send(sendData);
    } catch (error){
        let errorObj = {status: false, error};
        response.status(500).send(errorObj);
    }
}