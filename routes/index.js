var express = require('express'),
    router = express.Router({mergeParams: true});
var User = require("../models/user"),
    passport = require("passport"),
    middleware = require("../middleware");
    
router.get("/", function(req, res){
    res.redirect("/posts");
});

// //////////////    
// Auth Routes
// //////////////

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err)
            return res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/posts");
            })
        }
    });
});

router.get("/login", function(req, res){
   res.render("login"); 
});

router.post("/login", passport.authenticate("local", {
    successRedirect:"/posts",
    failureRedirect:"/login"
}), function(req, res){});
    
    
// //////////////
// Logout
// //////////////
router.get("/logout", middleware.isLoggedIn, function(req, res){
    req.logout();
    res.redirect("/posts");
});

module.exports = router;