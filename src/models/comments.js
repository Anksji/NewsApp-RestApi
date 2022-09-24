const mongoose = require("mongoose");
const userModel=require("../models/user");

const commentSchema=mongoose.Schema({
   
    comment:{
        type:String,
        required:true
    },
    newsArticleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"News",
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
    commentedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    }

},
{timestamps : true}

);

module.exports=mongoose.model("Comment",commentSchema);

