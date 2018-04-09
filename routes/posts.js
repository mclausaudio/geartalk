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
router.post("/", function(req, res){
    var title = req.body.title;
    var image = req.body.image;
    var description = req.body.description;
    var newPost = {title: title, image: image, description: description};
    Post.create(newPost, function(err, newlyCreated){
        if (err) {
            console.log(err)
        } else {
            //re direct to posts
            res.redirect("/posts");
        }
    })
});
//NEW Route
router.get("/new", function(req, res){
    res.render("posts/new")
})

//Show template
router.get("/:id", function(req, res){
    //get post from db
    Post.findById(req.params.id).populate("comments").exec(function(err, post){
        if (err){
            console.log(err)
        } else {
            console.log(post)
            //show template with specific campground
            res.render("posts/show", {post: post});
        }
    });
});

module.exports = router;

