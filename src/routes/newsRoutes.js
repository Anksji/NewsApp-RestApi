const express = require("express");
const { createNews,updateNews,deleteNews,getNewsArticles,updateAllTrendingNews
} = require("../controllers/newsControllers");
const myAuth=require("../middlewares/auth");

const newsRouter=express.Router();

/***********Version Control vr1 ******************** */
newsRouter.get("/",myAuth,getNewsArticles);

newsRouter.post("/",myAuth,createNews);

newsRouter.put("/updateTrending/",myAuth,updateAllTrendingNews);

newsRouter.put("/:id",myAuth,updateNews);

newsRouter.delete("/:id",myAuth,deleteNews);

module.exports=newsRouter;