const mongoose=require("mongoose");
const table = mongoose.Schema({
    user_id:{type:Number},
    your_name:{type:String},
    parent_id:{type:Number},
    father_name:{type:String},
    mobile_no:{type:Number},
    date:{type:Date},
    email:{type:String},
    picture:{type:String,default:"D:\Project\MLM project\public\assets\img\profile-img.jpg" },
    gender:{type:String},
    address:{type:String},
    password:{type:String},
    amount:{type:Number},
    blocked: { type: Boolean, default: false },
    auth_method: { type: String, enum: ['email', 'google'], default: 'email' },
    status:{type:String,enum:["active","deactive"],default:"deactive"}
});
module.exports = mongoose.model("hello",table);