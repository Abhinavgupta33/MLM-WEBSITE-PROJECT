
const jwt = require("jsonwebtoken");
const tble = require("./module/user");
// Middleware for handling auth
async function my_auth(req, res, next) {
  // Implement user auth logic
  try {
    if (req.cookies.mytoken != undefined && req.cookies.mytoken != "") {
      const tokendata = req.cookies.mytoken;
      
      const actdata = jwt.verify(tokendata, "aabb");
     // res.cookie("loginuserid",loginuserid);
      console.log(actdata);
      let user = await tble.findOne({ user_id:actdata })
        
      if (!user) return res.status(403).json({ msg: "User not found" });
      else{
      req.user = user;   // we set all user detail for request
      next();
    
      }
    } else {
      res.redirect("/login");
      console.log("Please Login First");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
}

module.exports = my_auth;
