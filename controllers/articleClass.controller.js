var ArticleClass=require('../models/articleClass.model');

var controller={
    checkArticleClass:function(req,res){
        var whereStr={className:req.body.articleClass}
        ArticleClass.findOne(whereStr,function(err,result){
            if(result){
                res.json({success:-1})
            }else{
                res.json({success:1})
            }
        })
    },
    articleClassSave:function(req,res,callback){
        var articleClassEntity=new ArticleClass({
            className:req.body.topicClass,
            description:req.body.topicClassDescription
        });
        articleClassEntity.save(function(err){
            if(!err){
                callback()
            }
        })
    },
    articleClassQuery:function(req,res,callback){
        ArticleClass.find({},function(err,result){
            console.log(result)
            callback(result)
        })
    },
    topicClassEdit:function(req,res,callback){
        var whereStr=({_id:req.params.id});
        ArticleClass.findOne(whereStr,function(err,result){
            callback(result)
        });
    },
    topicClassEditDeal:function(req,res,callback){
        var updataStr=({
            className:req.body.topicClass,
            description:req.body.topicClassDescription
        })
        ArticleClass.findByIdAndUpdate(req.params.id,updataStr,function(err,result){
            if(!err){
                callback()
            }
        })
    },
    topicClassDelete:function(req,res,callback){
        ArticleClass.findByIdAndDelete(req.params.id,function(err){
            if(!err){
                callback()
            }
        })
    },
    showAllArticles:function(req,res,callback){
        ArticleClass.aggregate([{
            $lookup:{
                from:"articles",
                localField:'_id',
                foreignField:'classId',
                as:'content'
            }
        },{
            $match:{
                content:{
                    $ne:[]
                }
            }
        }]).exec(function(err,result){
            callback(result)
        })
    }
};

module.exports=controller;
