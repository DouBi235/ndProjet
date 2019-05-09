var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var users=require('./users.model');
var article=require('./article.model');
var praiseSchema=new Schema({
    users_id:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    article_id:{
        type:Schema.Types.ObjectId,
        ref:'article'
    }
},{
    versionKey:false
});

var praiseModel=mongoose.model('praise',praiseSchema);

module.exports=praiseModel;