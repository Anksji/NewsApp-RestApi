const mongoose = require("mongoose");

const NewsSchema=mongoose.Schema({
    // _id: {
    //     type: String, // specify the type as String
    //   },
    title:{
        type:String,
        required:true
    },
    isTrending:{
        type:Boolean
    },
    topic:{
        type:String,
        default:"title"
    },
    likeCount:{
        type:Number
    },
    viewCount:{
        type:Number
    },
    shareNumber:{
        type:Number
    },
    viralScore:{
        type:Number,
        min :1,
        max:100
    },
    category:{
        type:[String]
    },
    content:{
        type:String,
        required:true
    },
    bannerUrl:{
        type:String
    },
    newsSrcUrl:{
        type:String
    },
    summary:{
        type:String
    },
    keywords:{
        type:[String],
    },
    postedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    updateUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},
{timestamps : true}

);
NewsSchema.index({ category: 'text', content: 'text', keywords: 'text', title: 'text', topic: 'text' });

module.exports=mongoose.model("News",NewsSchema);

