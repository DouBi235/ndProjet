var Manage=require('../models/manage.model');
var session=require("express-session");
var controller={
    login:function(req,res){
        var whereStr=({account:req.body.account,passowrd:req.body.pwd});
        Manage.findOne(whereStr,function(err,result){
            if(result){
                session.manageInfo={
                    manageId:result._id
                }
                res.redirect('/manage')
            }else{
                res.redirect("/loginManageError")
            }
        });
    },
    checkAdminPwd:function(req,res){
        Manage.findOne({passowrd:req.body.oldPwd},function(err,result){
            if(!err){
                if(result){
                    res.json({success:-1})
                }else{
                    res.json({success:1})
                }
            }
        })
    },
    adminPasswordModifyInfo:function(req,res,pwd,callback){
        Manage.findByIdAndUpdate(session.manageInfo.manageId,{passowrd:pwd},function(err,result){
            if(!err){
                callback()
            }
        })
    },
    adminExit:function(req,res,callback){
        session.manageInfo=""
        callback()
    }
};

module.exports=controller;