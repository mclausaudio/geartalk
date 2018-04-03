var express = require('express'),
    bodyparser = require('body-parser'),
    app = express(),
    mongoose = require('mongoose'),
    Post = require("./models/post"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");

mongoose.connect('mongodb://localhost/gear_talk');
app.use(bodyparser.urlencoded({extended: true}))
app.set("view engine", "ejs"); 
app.use(express.static(__dirname + '/public'));

seedDB();

app.get("/", function(req, res){
    res.render("landing");
})

//INDEX Route
app.get("/posts", function(req, res){
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
app.post("/posts", function(req, res){
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
app.get("/posts/new", function(req, res){
    res.render("posts/new")
})

//Show template
app.get("/posts/:id", function(req, res){
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



// ==================
// COMMENTS ROUTES
// ==================

app.get("/posts/:id/comments/new", function(req, res){
    Post.findById(req.params.id, function(err, post){
        if (err){
            console.log(err);
        } else {
            res.render("comments/new", {post: post});
        }
    })
})

app.post("/posts/:id/comments", function(req, res){
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
    })
    

    
    
    
});

    
    
    
    
    
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
})