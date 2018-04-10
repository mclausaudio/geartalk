var Post = require("../models/post"),
    Comment = require("../models/comment");
    
var middlewareObj = {};

middlewareObj.checkPostOwnership = function(req, res, next){
    if (req.isAuthenticated()) {
        Post.findById(req.params.id, function(err, foundPost){
            if (err) {
                res.redirect("back"); //takes user back to previous page
            } else {
                //if yes, does user own this post?
                // can not compare foundPost.author.id and req.user._id because .id returns OBJECT with id and ._id returns STRING with id
                // must use the .equals method, which is built into mongoose and compares the two.
                if (foundPost.author.id.equals(req.user._id)) {
                    next(); //move onto the rest of the route code
                    // res. render("posts/edit", {post: foundPost});
                } else {
                    res.send("You do not have permission to do that!")
                }
            }
        });        
    } else {
        res.redirect("back"); //takes user back to previous page
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                res.redirect("back"); //takes user back to previous page
            } else {
                //if yes, does user own this comment?
                // can not compare foundComment.author.id and req.user._id because .id returns OBJECT with id and ._id returns STRING with id
                // must use the .equals method, which is built into mongoose and compares the two.
                if (foundComment.author.id.equals(req.user._id)) {
                    next(); //move onto the rest of the route code
                    // res. render("posts/edit", {post: foundPost});
                } else {
                    res.redirect("back");
                }
            }
        });        
    } else {
        res.redirect("back"); //takes user back to previous page
    }
};

middlewareObj.isLoggedIn = function (req, res, next){
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
};


module.exports = middlewareObj;