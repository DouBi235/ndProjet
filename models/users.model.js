var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var usersSchema=new Schema({
   phone:{type:String,required:true},
   password:{type:String,required:true},
   nick:{type:String},
   sex:{type:String,enum:['男','女']},
   age:{type:Number},
   address:{type:String},
   qq:{type:String},
   email:{type:String},
   photo:{type:String},
   registerDate:{type:Date,default:new Date()},
   isMute:{type:Boolean,default:false}
},{
    versionKey:false
});


var usersModel=mongoose.model('users',usersSchema);

module.exports=usersModel;