let mong=require("mongoose");
exports.conDB=()=>{
    let con=mong.connect(process.env.DB);
    console.log("database created successfully");
}