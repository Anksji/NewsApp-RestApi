const express = require("express");
const userRouter = require("./userRoutes");
const newsRouter = require("./newsRoutes");
const commentRouter=require("./userCmtRoutes");
const categRouter=require('./categRoutes');
const allRoutes=express.Router();


allRoutes.use("/users",userRouter);
allRoutes.use("/news",newsRouter);
allRoutes.use("/comments",commentRouter);
//allRoutes.use("/shorts",shortNews);
allRoutes.use("/category",categRouter);

allRoutes.get("/",(req,res)=>{
    res.send("**********Current api version 1**********");
});

module.exports =  allRoutes;

