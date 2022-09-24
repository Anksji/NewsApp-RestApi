const categoryModel=require("../models/category");


const addNewCategory = async(req,res) =>{
    const data = req.body;

    console.log("current add category request is "+JSON.stringify(data));

   const addCategory=new categoryModel({
    _id:data.category,
    title:data.category
   });

   try{
     await addCategory.save();
     res.status(201).json({success:true,data:addCategory});
   }catch(error){
    console.log(error);
    res.status(500).json({success:false,message : "Something went wrong"});
   }
}



const deleteCategory = async (req,res) =>{
    const id=req.params.id;
    try{
        const deletedCateg=await categoryModel.findByIdAndRemove(id);
        res.status(202).json({success:true,data:deletedCateg});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message : "Something went wrong"});
    }
}

const getCategory = async (req,res) =>{
    try{
        const categories = await categoryModel.find();
        res.status(200).json({success:true,data:categories});

    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message : "Something went wrong"});
    }
}

module.exports = {
    addNewCategory,getCategory,deleteCategory
}