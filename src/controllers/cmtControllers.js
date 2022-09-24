const commentModel=require("../models/comments");


const addComment = async(req,res) =>{
    const data = req.body;

    console.log("current add comment request is "+JSON.stringify(data));

   const addComment=new commentModel({
    commentedUser:req.userId,
    comment:data.userComment,
    newsArticleId:data.newsArticleId
   });

   try{
     await addComment.save();
     res.status(201).json({success:true,data:addComment});
   }catch(error){
    console.log(error);
    res.status(500).json({success:false,message : "Something went wrong"});
   }
}


const updateComment = async (req,res) =>{
    const cmtId = req.params.id;
    const data=req.body;

    const updateCmt={
        updated:Date.now,
        comment:data.userComment,
        commentedUser:req.userId,
    };

    try{
        await commentModel.findByIdAndUpdate(cmtId,updateCmt,{new:true});
        res.status(200).json({success:true,data : updatedNews});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message : "Something went wrong"});
    }
}

const deleteComment = async (req,res) =>{
    const id=req.params.id;
    try{
        const deletedCmt=await commentModel.findByIdAndRemove(id);
        res.status(202).json({success:true,data:deletedCmt});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message : "Something went wrong"});
    }
}

const getComment = async (req,res) =>{
    try{
       
        //const notes = await noteModel.find({userId : req.userId});
        //const id=req.params.id;
        var requestQuery=req.query;

        const userComments = await commentModel.find(requestQuery).populate("commentedUser", "-password");
        res.status(200).json({success:true,comments:userComments});

    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message : "Something went wrong"});
    }
}

module.exports = {
    addComment,updateComment,deleteComment,getComment
}