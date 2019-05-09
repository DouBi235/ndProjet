var express = require('express');
var router = express.Router();

var usersController=require("../controllers/users.controller");
var manageController=require('../controllers/manage.controller');
var ArticleClass=require("../controllers/articleClass.controller");
var articleController=require('../controllers/article.controller');
var PraiseController=require('../controllers/praise.controller');
var CollectionController=require('../controllers/collect.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  ArticleClass.articleClassQuery(req,res,function(result){
    ArticleClass.showAllArticles(req,res,function(itemAll){
        res.render('index',{temp:result,itemAll:itemAll});
    })
  })
});
/*跳转注册界面*/
router.get("/register",function(req,res){
  res.render('register')
})

/*检查手机号码是否重复*/
router.post("/checkPhone",function(req,res){
  usersController.checkPhone(req,res);
});
router.post("/registerDeal",function(req,res){
  usersController.register(req,res);
});

router.get('/registerOk',function(req,res){
  res.render('registerOk')
});

/*登录路由*/
router.post("/loginDeal",function(req,res){
  usersController.login(req,res)
});

/*登录出错页面*/
router.get('/loginError',function(req,res){
  res.render('loginError')
});

/*管理员登录*/
router.get("/login",function(req,res){
  res.render('loginManage')
});

router.post('/LoginManageDeal',function(res,req){
  manageController.login(res,req)
});

router.get('/loginManageError',function(req,res){
  res.render("loginManageError")
});

/*用户发帖路由*/
router.post("/releaseTopic",function(req,res){
  articleController.releaseTopicDeal(req,res,function(){
    res.render("releaseTopicOk")
  });
});

/*显示帖子详情*/
router.get('/showDetail/:id',function(req,res){
  var articleId=req.params.id;
  CollectionController.show(req,res,articleId,function(collection){
    articleController.query(req,res,articleId,function(isZan){
        articleController.show(res,req,articleId,function(result){
            res.render("showDetail",{topic:result,isZan:isZan,collection:collection})
            console.log(isZan + "," + result)
         });
        });
    })


});

/*帖子点赞*/
router.get("/praise/:id",function(req,res){
    var id=req.params.id;
    PraiseController.praise(req,res,id,function(){
        res.redirect('/showDetail/' + id)
    })
});

/*帖子取消点赞*/
router.get("/cancelPraise/:id",function(req,res){
    var id=req.params.id;
    PraiseController.cancelPraise(req,res,id,function(){
        res.redirect('/showDetail/' + id)
    })
});

/*帖子收藏功能*/
router.get('/collection/:id',function(req,res){
    var id=req.params.id;
    CollectionController.collection(req,res,id,function(result){
        res.redirect("/showDetail/" + id)
    })
});
/*取消帖子收藏*/
router.get("/notCollection/:id",function(req,res){
    var id=req.params.id;
    CollectionController.notCollection(req,res,id,function(){
        res.redirect("/showDetail/" + id)
    })
})
module.exports = router;
