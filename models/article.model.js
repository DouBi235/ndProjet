var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Users=require('./users.model');
var ArticleClass=require('./articleClass.model');
var articleSchema=new Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    issueDate:{type:Date,default:new Date()},
    users_id:{
        type:Schema.Types.ObjectId,
        ref:'Users'
    },
    classId:{
        type:Schema.Types.ObjectId,
        ref:'ArticleClass'
    },
    status:{type:Number,default:0},
    isOut:{type:Boolean,default:false},
    likes:{type:Number,default:0}
},{
    versionKey:false
});

var articleModel=mongoose.model('article',articleSchema);
module.exports=articleModel;