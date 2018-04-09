var express = require('express'),
    router = express.Router({mergeParams: true});
var Post = require("../models/post"),
    Comment = require("../models/comment"),
    User = require("../models/user"),
    passport = require("passport");
    
//INDEX Route
router.get("/", function(req, res){
    console.log(req.user);
    //get all posts from db
    Post.find({}, function(err, Posts){
        if (err){
            console.log(err);
        } else {
            res.render("posts/index", {posts:Posts});     
        }
    })
});
// CREATE PATH
router.post("/", isLoggedIn, function(req, res){
    var title = req.body.title;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newPost = {title: title, image: image, description: description, author: author};
    Post.create(newPost, function(err, newlyCreated){
        if (err) {
            console.log(err)
        } else {
            console.log(newlyCreated);
            //re direct to posts
            res.redirect("/posts");
        }
    })
});
//NEW Route
router.get("/new", isLoggedIn, function(req, res){
    res.render("posts/new")
})

//Show template
router.get("/:id", function(req, res){
    //get post from db
    Post.findById(req.params.id).populate("comments").exec(function(err, post){
        if (err){
            console.log(err)
        } else {
            //show template with specific campground
            res.render("posts/show", {post: post});
        }
    });
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
};

module.exports = router;

