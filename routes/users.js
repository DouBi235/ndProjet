var express = require('express');
var router = express.Router();
var session=require('express-session');
var multiparty=require("connect-multiparty");

var article=require("../controllers/article.controller");
var usersControll=require("../controllers/users.controller");
var usersController=require("../controllers/users.controller");
var collection=require("../controllers/collect.controller");
var multipartyMiddleWare=multiparty()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/index');
});

/*安全退出*/
router.get('/exit',function(req,res){
  res.render('users/exit')
});

/*我的帖子路由*/
router.get('/myTopic',function(req,res){
  article.myTopic(req,res,function(result){
    console.log(result)
    res.render("users/myTopic",{temp:result})
  })
});
/*帖子下架*/
router.get("/topicShelves/:id",function(req,res){
  var id=req.params.id;
    article.topicShelves(req,res,id,{isOut:true},function(){
      res.redirect("/users/myTopic")
    })
});

/*帖子上架*/
router.get('/topicTheshelves/:id',function(req,res){
  var id=req.params.id;
  article.topicShelves(req,res,id,{isOut:false},function(){
    res.redirect('/users/myTopic')
  })
});

/*帖子编辑*/
router.get('/topicEdit/:id',function(req,res){
  var id=req.params.id
  article.topicEditQuery(req,res,id,function(result){
    res.render('users/topicEdit',result)
  })
});
router.post("/topicEditDeal/:id",function(req,res){
  article.topicEditDeal(req,res,function(){
    res.render('users/topicEditOk')
  })
});

/*删除帖子*/
router.get('/topicDelete/:id',function(req,res){
  var id=req.params.id;
  article.topicDelete(req,res,id,function(){
    res.render('users/topicDeleteOk')
  })
});

/*完善个人信息*/
router.get("/personalInfoModify",function(req,res){
  usersControll.personalInfoModify(req,res,function(result){
    res.render('users/personalInfoModify',result);
  })
});

router.post("/modifyPersonalInfoDeal/:id",function(req,res){
  usersControll.modifyPersonalInfoDeal(req,res,function(){
    res.render("users/modifyPersonalInfoDealOk")
  })
});

/*修改登录密码*/
router.get("/passwordModify",function(req,res){
  res.render('users/passwordModify')
});
/*检查旧密码*/
router.post("/checkOldPwd",function(req,res){
  console.log("ll")
  usersControll.checkOldPwd(req,res)
});
router.post('/passwordModifyDeal',function(req,res){
  usersControll.passwordModifyDeal(req,res,function(){
      session.userInfo.userNick=""
      res.redirect('/');
  })
});
/*我的收藏功能*/
router.get("/myCollection",function(req,res){
  collection.showCollection(req,res,function(result){
    res.render("users/myCollection",{temp:result})
  })
});


/*我的收藏帖子详情查看*/
router.get("/topicDetails/:id",function(req,res){
    var id=req.params.id;
    article.showDetails(req,res,id,function(result){
        res.render('users/topicDetails',result)
    })
});
/*取消收藏功能*/
router.get('/cancelSc/:id',function(req,res){
  var id=req.params.id;
  collection.cancelSc(req,res,id,function(){
    res.render('users/cancelScOk')
  })
});
router.get('/safeExit',function(req,res){
  session.userInfo.userNick=""
  res.redirect('/');
});

/*上传头像功能*/
router.get("/uploadPhoto",function(req,res){
  usersController.personalInfoModify(req,res,function(result){
    res.render("users/uploadPhoto",result)
  })
});

router.post("/uploadPhotoDeal",multipartyMiddleWare,function(req,res){
  var file=req.files.ph
  var index=file.path.lastIndexOf('\\');
  var fileName=file.path.slice(index+1)
  usersController.uploadPhotoDeal(req,res,fileName,function(){
    res.redirect("/users/uploadPhoto")
  })
})



module.exports = router;
