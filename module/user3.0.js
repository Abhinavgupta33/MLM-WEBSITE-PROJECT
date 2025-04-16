const { default: mongoose } = require("mongoose");

const table3 = mongoose.Schema({
    product_no:{type:Number},
    product_name:{type:String},
    product_description:{type:String},
    product_price:{type:Number},
    product_category:{type:String},
    product_quantity:{type:Number},
    product_image:{type:String},    
    addedby:{type:String }
});
module.exports = mongoose.model("hello3.0",table3);