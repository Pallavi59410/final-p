const express = require ('express');
const mongoose = require ('mongoose');
const APIRoutes =require("./routes/APIRoutes");
const cors = require("cors");
const app =express();
const MONGO_URI ="mongodb://127.0.0.1:27017/Webclass";
const PORT = 3001;



app.use(cors()); // 3001 ===> 3000
//post data disabled. to make it enabled
//body parse
app.use(express.json()); // enable all incoming json
app.use(express.urlencoded({ extended: false})); //allow raw post data to convert to a js object

app.use("/", APIRoutes);

mongoose.connect(MONGO_URI).then(() =>{
    app.listen(PORT, () => {
        console.log("Server started at port", PORT);
    });
})
.catch((error) =>{
    console.log(error);
});