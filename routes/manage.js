var express = require('express');
var router = express.Router();
var manageController=require('../controllers/manage.controller');
var ArticleClassController=require('../controllers/articleClass.controller');
var manageModel=require('../models/manage.model');
var articleController=require('../controllers/article.controller');
var usersController=require("../controllers/users.controller");


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('manage/index');
});
/*帖子分类*/
router.get('/topicClass',function(req,res){
    ArticleClassController.articleClassQuery(req,res,function(result){
        res.render('manage/topicClass',{temp:result})
    });
});
/*检查帖子分类是否重复*/
router.post("/checkArticleClass",function(req,res){
    ArticleClassController.checkArticleClass(req,res)
});
router.post("/topicClassInfo",function(req,res){
    ArticleClassController.articleClassSave(req,res,function(){
        res.redirect("/manage/topicClass")
    });
})

router.get("/articleClassOk",function(req,res){
    res.render("manage/articleClassOk")
})
/**/
router.get("/topicClassEdit/:id",function(req,res){
    ArticleClassController.topicClassEdit(req,res,function(result){
        res.render('manage/topicClassEdit',result)
    })
});

router.post("/topicClassEditInfo/:id",function(req,res){
    ArticleClassController.topicClassEditDeal(req,res,function(){
        res.render("manage/topicClassEditDealOk")
    });
})
/*删除分类名称*/
router.post("/topicClassDelete/:id",function(req,res){
    ArticleClassController.topicClassDelete(req,res,function(){
        res.render("manage/topicClassDeleteOk")
    })
});

/*帖子审核*/
router.get('/topicAudit',function(req,res){
    articleController.topicAuditDeal(req,res,function(result){
       res.render('manage/topicAudit',{temp:result})
    })
});

/*帖子审核通过路由*/
router.get('/topicThrough/:id',function(req,res){
    var id=req.params.id;
    articleController.topicThrough(req,res,id,{status:1},function(){
        res.redirect('/manage/topicAudit')
    })
});
/*帖子未通过审核*/
router.get('/topicNotThrough/:id',function(req,res){
    var id=req.params.id;
    articleController.topicThrough(req,res,id,{status:-1},function(){
        res.redirect('/manage/topicAudit')
    })
});

/*已通的帖子路由*/
router.get("/topicPassed",function(req,res){
    articleController.topicPassed(req,res,{status:1},function(result){
        res.render("manage/topicPassed",{temp:result})
    });
});
/*未通过帖子路由*/
router.get('/topicNotPassed',function(req,res){
    articleController.topicPassed(req,res,{status:-1},function(result){
        res.render("manage/topicNotPassed",{temp:result})
    });
});
/*查看帖子详情*/
router.get('/topicDetails/:id',function(req,res){
    articleController.topicDetails(req,res,function(result){
        res.render('manage/topicDetails',{temp:result})
    })
});

/*统计注册用户*/
router.get('/totalUsers',function(req,res){
    usersController.total(req,res,function(result){
        res.render('manage/totalUsers',{zcr:result})
    })
});


router.get("/sexTotal",function(req,res){
    usersController.sexTotal(req,res,function(result){
        res.json({success:result})
    })
});

/*查询用户信息*/
router.get("/queryUsers",function(req,res){
    var key=req.query.key
    usersController.queryUsers(req,res,key,function(result){
        res.render("manage/queryUsers",{temp:result})
    })
});
/*用户禁言*/
router.get('/gagUsersDeal/:id',function(req,res){
    var id=req.params.id;
    usersController.gagUsersDeal(req,res,id,function(){
        res.redirect("/manage/queryUsers")
    })
})
/*取消用户禁言*/
router.get("/cancelGag/:id",function(req,res){
    var id=req.params.id
    usersController.cancelGag(req,res,id,function(){
        res.redirect("/manage/gagUsers")
    })
})
/*已禁言用户*/
router.get("/gagUsers",function(req,res){
    usersController.gagUsers(req,res,function(result){
        res.render("manage/gagUsers",{temp:result})
    })
});



/*管理员密码修改*/
router.get("/adminPasswordModify",function(req,res){
        res.render("manage/adminPasswordModify")
});
router.post("/checkAdminPwd",function(req,res){
    var oldPwd=req.query.oldPwd;
    console.log(oldPwd)
    manageController.checkAdminPwd(req,res)
});

router.post("/adminPasswordModifyInfo",function(req,res){
    var pwd=req.body.newPwd;
    manageController.adminPasswordModifyInfo(req,res,pwd,function(){
        res.render('manage/adminPasswordModifyInfoOk')
    })
})

/*分类统计*/
router.get("/clasTotal",function(req,res){
    res.render("manage/classTotal")
});
router.post('/getData',function(req,res){
    usersController.getDate(req,res)
});

/*日发帖统计*/
// router.get("/articleDayTotal",function(req,res){
//     usersController.articleDayTotal(req,res,)
// });

/*管理员退出*/
router.get('/adminExit',function(req,res){
    manageController.adminExit(req,res,function(){
        res.redirect("/")
    })
})
module.exports = router;