const mongoose=require("mongoose");
const table4 = mongoose.Schema({
   
activity:{type:String,default:"No Recent Activity"},
user_id:{type:Number,default:0},
activity_detail:{type:String,default:"No Activity Is Done"}
});
module.exports = mongoose.model("recentactivity",table4);