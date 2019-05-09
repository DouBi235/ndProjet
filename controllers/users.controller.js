var Users=require('../models/users.model');
var artic=require('../models/article.model')
var session=require('express-session');
var controller={
    checkPhone:function(req,res){
        var whereStr={phone:req.body.phone};
        Users.findOne(whereStr,function(err,result){
            if(result){
                res.json({success:-1});
            }else{
                res.json({success:1})
            }
        })
    },
    register:function(req,res){
        var min=10000,max=99999
        var ran=parseInt(Math.random()*(max-min+1)+min);
        var usersEntity=new Users({
            phone:req.body.phone,
            password:req.body.password,
            nick:"程序猿" + ran
        });
        usersEntity.save(function(err,result){
            if(!err){
                res.redirect("/registerOk")
            }
        })

    },
    login:function(req,res){
        var whereStr=({phone:req.body.account,password:req.body.pwd});
        Users.findOne(whereStr,function(err,result){
            if(result){
                session.userInfo={
                    userNick:result.nick,
                    userId:result._id
                }
               res.redirect("/")
            }else{
                res.redirect("/loginError")
            }
        })
    },
    personalInfoModify:function(req,res,callback){
     Users.findById(session.userInfo.userId,function(err,result){
         callback(result)
     })
    },
    modifyPersonalInfoDeal:function(req,res,callback){
        var whereStr=({
            nick:req.body.nick,
            sex:req.body.sex,
            age:req.body.age,
            address:req.body.address,
            qq:req.body.QQ,
            email:req.body.email
        })
        Users.findByIdAndUpdate(req.params.id,whereStr,function(err){
            if(!err){
                callback()
            }
        })
    },
    checkOldPwd:function(req,res){
        var whereStr=({_id:session.userInfo.userId,password:req.body.oldPwd})
        Users.findOne(whereStr,function(err,result){
            if(!err){
                if(result){
                    res.json({success:-1})
                }else{
                    res.json({success:1})
                }
            }
        })
    },
    passwordModifyDeal:function(req,res,callback){
        Users.findByIdAndUpdate(session.userInfo.userId,{password:req.body.newPwd},function(err){
            callback()
        })
    },
    total:function(req,res,callback){
        Users.find().countDocuments(function(err,result){
            callback(result)
        })
    },
    sexTotal:function(req,res,callback){
        Users.aggregate([{
            $group:{
                _id:'$sex',
                renshu:{
                    $sum:1
                }
            }
        }]).exec(function(err,result){
            callback(result)
        })
    },
    queryUsers:function(req,res,key,callback){
        console.log(key)
        if(key===undefined){
            callback("")
        }else if(key===""){
            Users.find({},function(err,result){
                callback(result)
            })
        }else{
            var reg=new RegExp(key)
            var whereStr={
                $or:[
                    {phone:reg},
                    {nick:reg}
                ]
            }
            Users.find(whereStr,function(err,result){
                callback(result)
            })
        }
    },
    gagUsersDeal:function(req,res,id,callback){
        Users.findByIdAndUpdate(id,{isMute:true},function(err){
            if(!err){
                callback()
            }
        })
    },
    gagUsers:function(req,res,callback){
        var whereStr={
            isMute:true
        }
        Users.find(whereStr,function(err,result){
            console.log(result)
            callback(result)
        })
    },
    cancelGag:function(req,res,id,callback){
            Users.findByIdAndUpdate(id,{isMute:false},function(){
                callback()
            })
       },
    uploadPhotoDeal:function(req,res,fileName,callback){
        Users.findByIdAndUpdate(session.userInfo.userId,{photo:fileName},function(err){
            if(!err){
                callback()
            }
        })
    },
    getDate:function(req,res){
        artic.aggregate([{
            $group:{
                _id:'$classId',
                count:{
                    $sum:1
                }
            }
        },
        {
           $lookup:{
               from:"articleclasses",
               localField:'_id',
               foreignField:'_id',
               as:'content'
           }
            }]).exec(function(err,result){
                res.json({temp:result})
        })
    }
}
module.exports=controller;