var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Article=require('./article.model');
var Users=require('./users.model');
var commentSchema=new Schema({
    commentContent:{type:String},
    commentDate:{type:Date,default:new Date()},
    article_id:{
        type:Schema.Types.ObjectId,
        ref:'Article'
    },
    users_id:{
        type:Schema.Types.ObjectId,
        ref:'Users'
    },
    replayContent:{type:String},
    replayDate:{type:Date}
},{
    versionKey:false
});

var commentModel=mongoose.model('comment',commentSchema);