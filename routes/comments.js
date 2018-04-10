var express = require('express'),
    router = express.Router({mergeParams: true});
var Post = require("../models/post"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");

// ==================
// COMMENTS ROUTES
// ==================
// NEW view
router.get("/new", middleware.isLoggedIn, function(req, res){
    Post.findById(req.params.id, function(err, post){
        if (err){
            console.log(err);
        } else {
            res.render("comments/new", {post: post});
        }
    })
})
//POST/CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
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
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    //save entire post
                    post.comments.push(comment);
                    post.save();
                    console.log(comment);
                    res.redirect("/posts/" + post._id);
                }
            })
            
        }
    });
});

//EDIT

router.get("/:comment_id/edit", middleware.checkCommentOwnership,function (req, res){
    Comment.findById(req.params.comment_id,function(err, foundComment){
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {post_id: req.params.id, comment: foundComment});        
        }
    });
});

//UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/posts/" + req.params.id);
        }
    });
});

//COMMENT DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //find by id and remove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if (err){
            res.redirect("back");
        }
        res.redirect("/posts/" + req.params.id);
    });
})

module.exports = router;

    