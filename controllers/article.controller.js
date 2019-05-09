var Artic=require('../models/article.model');

var session=require('express-session');
var UsersModel=require('../models/users.model');
var ArticleClass=require('../models/articleClass.model');
var Praise=require('../models/praise.model');

var controller={
    releaseTopicDeal:function(req,res,callback){
        var articEntity=new Artic({
            title:req.body.topicTitle,
            content:req.body.topicContent,
            users_id:session.userInfo.userId,
            classId:req.body.topicClass
        });
        articEntity.save(function(err){
            if(!err){
                callback()
            }
        })
    },
    topicAuditDeal:function(req,res,callback){
        Artic.find({status:0}).populate({
                path:'users_id',
                model:UsersModel,
                select:'_id nick'
        }).populate({
                path:'classId',
                model:ArticleClass,
                select:'_id className'
        }).exec(function(err,result){
            callback(result)
        })
    },
    topicThrough:function(req,res,id,condition,callback){
        Artic.findByIdAndUpdate(id,condition,function(err){
            if(!err){
                callback()
            }
        })
    },
    topicPassed:function(req,res,condition,callback){
        Artic.find(condition).populate({
                path:'users_id',
                model:UsersModel,
                select:'_id nick'
        }).populate({
                path:'classId',
                model:ArticleClass,
                select:'_id className'
        }).sort({issueDate:-1}).limit(10).exec(function(err,result){
            callback(result)
        })
    },
    topicDetails:function(req,res,callback){
        Artic.find({_id:req.params.id}).populate({
            path:'users_id',
            model:UsersModel,
            select:'_id nick'
        }).populate({
            path:'classId',
            model:ArticleClass,
            select:'_id className'
        }).exec(function(err,result){
            callback(result)
        })
    },
    myTopic:function(req,res,callback){
        Artic.find({users_id:session.userInfo.userId}).populate({
            path:'users_id',
            model:UsersModel,
            select:'_id nick'
        }).populate({
            path:'classId',
            model:ArticleClass,
            select:'_id className'
        }).sort({issueDate:-1}).limit(10).exec(function(err,result){
            callback(result)
        })
    },
    topicShelves:function(req,res,id,condition,callback){
        Artic.findByIdAndUpdate(id,condition,function(err){
            if(!err){
                callback()
            }
        })
    },
    topicEditQuery:function(req,res,id,callback){
        Artic.findById(id,function(err,result){
            ArticleClass.find({},function(err,topClass){
                if(!err){
                    callback({topicInfo:result,topicClassInfo:topClass})
                }
            })

        })
    },
    topicEditDeal:function(req,res,callback){
        var whereStr=({classId:req.body.topicClass,title:req.body.topicTitle,content:req.body.topicContent})
       console.log(whereStr)
        Artic.findByIdAndUpdate(req.params.id,whereStr,function(err){
            if(!err){
                callback()
            }
        })
    },
    topicDelete:function(req,res,id,callback){
        Artic.findByIdAndDelete(id,function(err){
            if(!err){
                callback()
            }
        })
    },
    show:function(req,res,id,callback){
        Artic.findOne({_id:id}).populate({
            path:'users_id',
            model:UsersModel,
            select:'_id nick photo'
        }).exec(function(err,result){
            console.log(result)
            callback(result)
        })
    },
    query:function(req,res,articleId,callback){
        var whereStr={
            users_id:session.userInfo.userId,
            article_id:articleId
        };
        Artic.findOne()
        Praise.findOne(whereStr,function(err,result){
            callback(result)
        })
    },
    showDetails:function(req,res,id,callback){
        Artic.findById(id,function(err,result){
            callback(result)
        })
    }
}
module.exports=controller