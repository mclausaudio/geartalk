var express = require('express'),
    router = express.Router({mergeParams: true});
var Post = require("../models/post"),
    Comment = require("../models/comment");

// ==================
// COMMENTS ROUTES
// ==================

router.get("/new", isLoggedIn, function(req, res){
    Post.findById(req.params.id, function(err, post){
        if (err){
            console.log(err);
        } else {
            res.render("comments/new", {post: post});
        }
    })
})

router.post("/", isLoggedIn, function(req, res){
    //lookup post by id
    Post.findById(req.params.id, function(err, post) {
        if (err) {
            console.log(err);
            res.redirect("/posts");
        } else {
            //create comment
            Comment.create(req.body.comment, function(err, comment){
                if (err) {
                    console.log(err)
                } else {
                    post.comments.push(comment);
                    post.save();
                    res.redirect("/posts/" + post._id);
                }
            })
            
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

    