var mongoose=require('mongoose');
var url='mongodb://localhost:27017/froum';
mongoose.connect(url,{useNewUrlParser:true},function(err){
    if(!err){
        console.log('数据库连接成功');
    }else{
        console.log('数据库连接失败' + "," + err)
    }
});