var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var articleClassSchema=new Schema({
   className:{type:String},
   description:{type:String}
},{
    versionKey:false
});

var articleClassModel=mongoose.model('articleClass',articleClassSchema);

module.exports=articleClassModel;