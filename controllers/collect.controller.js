var session=require('express-session')
var Collection=require("../models/collect.model");
var Artic=require("../models/article.model");
var controller={
    collection:function(req,res,id,callback){
       var collectionEntity=new Collection({
            users_id:session.userInfo.userId,
            article_id:id
       });
       collectionEntity.save(function(err){
           callback()
       })
    },
    notCollection:function(req,res,id,callback){
        var whereStr={
            users_id:session.userInfo.userId,
            article_id:id
        }
        Collection.deleteOne(whereStr,function(err){
            console.log(whereStr)
            callback()
        })
    },
    show:function(req,res,id,callback){
        var whereStr={
            users_id:session.userInfo.userId,
            article_id:id
        }
        Collection.findOne(whereStr,function(err,result){
            callback(result)
        })
    },
    showCollection:function(req,res,callback){
        Collection.find({users_id:session.userInfo.userId}).populate({
            path:"article_id",
            model:Artic,
            select:"title content"
        }).exec(function(err,result){
            callback(result)
        })
    },
    cancelSc:function(req,res,id,callback){
        Collection.findByIdAndDelete(id,function(){
            callback()
        })
    }
}
module.exports=controller;