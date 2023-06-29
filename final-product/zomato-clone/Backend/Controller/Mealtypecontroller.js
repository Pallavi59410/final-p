const { request, response } = require("express");
const MealtypeModel = require("../models/MealtypeModel");

module.exports.getMealtypeList = async (request, response) => {
    try{
        let mealtypeList = await MealtypeModel.find();
        let sendData = {
            status: mealtypeList.length ===0? false : true,
            mealtypeList,
            count: mealtypeList.length,
        };
        response.status(200).send(sendData);
    } catch (error){
        let errorObj = { status: false,error};
        response.status(500).send(errorObj);
    }
};