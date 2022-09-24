const newsModel=require("../models/news")

const createNews = async(req,res) =>{
    const data = req.body;

    console.log("add news article json "+JSON.stringify(req.body));

   const addNewsData=new newsModel({
    title:data.title,
    isTrending:data.isTrending,
    added:Date.now,
    updated:Date.now,
    
    likeCount:0,
    viewCount:0,
    commentCount:0,
    shareNumber:0,
    viralScore:50,
    category:data.category,
    content:data.content,
    bannerUrl:data.bannerUrl,
    keywords:data.keywords,
    summary:data.summary,
    newsSrcUrl:data.newsSrcUrl,
    postedUser:req.userId,
    
   });

   try{
     await addNewsData.save();
     res.status(201).json({success:true,addNewsData});
   }catch(error){
    console.log(error);
    res.status(500).json({success:false,message : "Something went wrong"});
   }
}


const updateAllTrendingNews=async(req,res)=>{
    const data=req.body;

    const updatedNews={
        updated:Date.now,
    }
    if(data.title){
        updatedNews.title=data.title;
    }

    if(data.bannerUrl){
        updatedNews.bannerUrl=data.bannerUrl;
    }

    if(data.content){
        updatedNews.content=data.content;
    }

    if(data.isTrending){
        updatedNews.isTrending=data.isTrending;
    }

    if(data.topic){
        updatedNews.topic=data.topic;
    }

    if(data.category){
        updatedNews.category=data.category;
    }

    if(data.keywords){
        updatedNews.keywords=data.keywords;
    }
    if(data.newsSrcUrl){
        updatedNews.newsSrcUrl=data.newsSrcUrl;
    }

    if(data.title){
        updatedNews.title=data.title;
    }

    try{
        await newsModel.updateMany({isTrending: true} ,{$set : updatedNews});
        res.status(200).json({success:true,updatedNews});
    }catch(error){
        console.log("catch section error message "+error);
        res.status(500).json({success:false,message:"Something went wrong "+error});
    }

}

const updateNews = async (req,res) =>{
    const id = req.params.id;
    const data=req.body;

    const updatedNews={
        updated:Date.now,
        updateUser:req.userId,
    };

    if(data.title){
        updatedNews.title=data.title;
    }
 
    if(data.likeCount){
        updatedNews.likeCount=data.likeCount;
    }
    if(data.viewCount){
        updatedNews.viewCount=data.viewCount;
    } if(data.viralScore){
        updatedNews.viralScore=data.viralScore;
    } if(data.shareNumber){
        updatedNews.shareNumber=data.shareNumber;
    }

    if(data.bannerUrl){
        updatedNews.bannerUrl=data.bannerUrl;
    }
    if(data.content){
        updatedNews.content=data.content;
    }
    if(data.summary){
        updatedNews.summary=data.summary;
    }
    if(data.newsSrcUrl){
        updatedNews.newsSrcUrl=data.newsSrcUrl;
    }
    if(data.isTrending){
        updatedNews.isTrending=data.isTrending;
    }
    if(data.topic){
        updatedNews.topic=data.topic;
    }
    if(data.category){
        updatedNews.category=data.category;
    }
    if(data.keywords){
        updatedNews.keywords=data.keywords;
    }
    if(data.title){
        updatedNews.title=data.title;
    }

    try{
        await newsModel.findByIdAndUpdate(id,updatedNews,{new:true});
        res.status(200).json({success:true,data:updatedNews});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message : "Something went wrong"});
    }
}

const deleteNews = async (req,res) =>{
    const id=req.params.id;
    try{
        const note=await newsModel.findByIdAndRemove(id);
        res.status(202).json({success:true,note});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message : "Something went wrong"});
    }
}

const getNewsArticles = async (req,res) =>{
    try{
       
        //const notes = await noteModel.find({userId : req.userId});
        //const id=req.params.id;
        var requestQuery={};
        const {page, limit} = req.query;
        if(req.query.keywords){
            console.log("list of all keywords"+req.query.keywords);
            const key_words = req.query.keywords.split(',');
            requestQuery={ keywords: {$in: key_words} };
        }
        if(req.query.category){
            const category = req.query.category.split(',');
            requestQuery={ category: {$in: category} };
        }
        if(req.query.search){
            requestQuery={ $text: { $search: req.query.search } };
        }
        /********* query sort options **********/
        const sortOptions = getSortOptions(req);
        

        console.log("sort by json data "+JSON.stringify(sortOptions));

        const skip = (page - 1) * limit;
    
        console.log(" current requested query "+JSON.stringify(requestQuery));
        const newsArticles = await newsModel.find(requestQuery).populate("postedUser", "-password").sort(sortOptions).skip(skip).limit(limit);
        res.status(200).json({success:true,newsArticles});

    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message : "Something went wrong"});
    }
}


function getSortOptions(req){
    const sortOptions={};
    if(req.query.sortBy){
        const sortByArray = req.query.sortBy.split(',');
        var sortOrder;
        if(req.query.sortOrder){
            sortOrder=req.query.sortOrder.split(',');
        }else{
            sortOrder=[-1];
        }
        
        for(let i=0;i<sortByArray.length;i++){
            console.log("inside loop i value "+i);
            let sortOrderIndex;
            if(sortOrder.length>i){
                sortOrderIndex=i;
            }else{
                console.log("current sort order is in else part "+sortOrder.length);
                sortOrderIndex=0;
                sortOrder[0]=-1;
                console.log("current sort order at index 0 "+sortOrder[0]);
            }

            sortOptions[sortByArray[i]] = sortOrder[i] === null ? -1 : sortOrder[sortOrderIndex];
        }
    }
    return sortOptions;
}


module.exports = {
    createNews,updateNews,deleteNews,
    getNewsArticles,updateAllTrendingNews
}