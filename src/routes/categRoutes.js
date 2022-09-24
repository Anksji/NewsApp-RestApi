const express = require("express");
const { getCategory,addNewCategory,deleteCategory
} = require("../controllers/categControllers");
const myAuth=require("../middlewares/auth");

const categoryRouter=express.Router();

/***********Version Control vr1 ******************** */
categoryRouter.get("/",myAuth,getCategory);

categoryRouter.post("/",myAuth,addNewCategory);


categoryRouter.delete("/:id",myAuth,deleteCategory);


module.exports=categoryRouter;