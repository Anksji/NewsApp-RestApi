const mongoose = require("mongoose");

const categorySchema=mongoose.Schema({
   
    _id:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
},
{timestamps : true}

);

module.exports=mongoose.model("Category",categorySchema);

