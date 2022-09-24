const express = require("express");
const { getComment,addComment,updateComment,deleteComment
} = require("../controllers/cmtControllers");
const myAuth=require("../middlewares/auth");

const commentRouter=express.Router();

/***********Version Control vr1 ******************** */
commentRouter.get("/",myAuth,getComment);

commentRouter.post("/",myAuth,addComment);

commentRouter.put("/:id",myAuth,updateComment);

commentRouter.delete("/:id",myAuth,deleteComment);


module.exports=commentRouter;