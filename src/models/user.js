const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please enter your username"]
    },
    avatar:{
        type:String,
    },
    userSubscribeTopic:[String],
    role: {
        type: String,
        enum: ["admin",  "reader"],
        default: "reader",
      },
    password:{
        type:String,
        required: [true, "Please enter your password"],
        select: false,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    phoneNumber:{
        type:String,
    },
},{timestamps:true}
);

module.exports=mongoose.model("User",UserSchema);