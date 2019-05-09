var  Praise=require('../models/praise.model');
var session=require('express-session');
var article=require('../models/article.model');

var controller={
    praise:function(req,res,id,callback){
        var updataStr={
            $inc:{
                likes:1
            }
        };
        var praiseEntity=new Praise({
            users_id:session.userInfo.userId,
            article_id:id
        })
        praiseEntity.save(function(err){
            article.findByIdAndUpdate(id,updataStr,function(err){
                callback()
            })
        })

    },
    cancelPraise:function(req,res,id,callback){
        var whereStr={
            users_id:session.userInfo.userId,
            article_id:id
        }
        var updataStr={
            $inc:{
                likes:-1
            }
        };
        article.findByIdAndUpdate(id,updataStr,function(err){
            Praise.deleteOne(whereStr,function(err){
                callback()
            })
        })

    }
}
module.exports=controller;