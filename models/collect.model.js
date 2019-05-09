var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var users=require('./users.model');
var article=require('./article.model');
var collectSchema=new Schema({
    users_id:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    article_id:{
        type:Schema.Types.ObjectId,
        ref:'article'
    }
});

var collectModel=mongoose.model('collect',collectSchema);

module.exports=collectModel;