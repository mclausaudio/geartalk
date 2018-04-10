var express = require('express'),
    router = express.Router({mergeParams: true});
var Post = require("../models/post"),
    Comment = require("../models/comment"),
    User = require("../models/user"),
    passport = require("passport"),
    middleware = require("../middleware");  //if point to directory and do not specify file, node automatically grabs index.js
    
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
router.post("/", middleware.isLoggedIn, function(req, res){
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
router.get("/new", middleware.isLoggedIn, function(req, res){
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

//EDIT Route
router.get("/:id/edit", middleware.checkPostOwnership, function(req, res){
    //we should not get any errors at this point because the middleware i wrote.
    // at this point, confirmed it is the post's owner
        Post.findById(req.params.id, function(err, foundPost){
            if (err) {
                res.redirect("back");
            } else {
                res. render("posts/edit", {post: foundPost});         
            }
        });        
    });
// UPDATE Route
router.put("/:id", middleware.checkPostOwnership, function(req, res){
    //find and updated post
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
        console.log(req.params.id + " " + req.body.post);
        if (err) {
            console.log(err);
            res.redirect("/posts");
        } else {
            //redirect to post
            res.redirect("/posts/" + req.params.id);
        }
    });
});

//DESTROY / DELETE POST ROUTE
router.delete("/:id", middleware.checkPostOwnership, function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            res.redirect("/posts");
        } else {
            res.redirect("/posts");
        }
    })
});

module.exports = router;