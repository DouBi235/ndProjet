var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var manageSchema=new Schema({
    account:{type:String},
    passowrd:{type:String}
},{
    versionKey:false
});
var manageModel=mongoose.model("manage",manageSchema);

module.exports=manageModel;