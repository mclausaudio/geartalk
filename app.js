var express = require('express'),
    bodyparser = require('body-parser'),
    app = express(),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/gear_talk');
app.use(bodyparser.urlencoded({extended: true}))
app.set("view engine", "ejs");   

var postSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String
});

var Post = mongoose.model("Post", postSchema);
//     Post.create({
//         title:"tr909-another one added", 
//         image:"http://www.6am-group.com/wp-content/uploads/2015/09/Roland-909.jpg",
//         description:"This is a great machine.  Classic sounds."
//     }, function (err, post){
//         if (err){
//             console.log(err)
//         } else {
//             console.log(post);
//         }
//     });

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
            res.render("index", {posts:Posts});     
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
    res.render("new.ejs")
})

//Show template
app.get("/posts/:id", function(req, res){
    //get post from db
    Post.findById(req.params.id, function(err, post){
        if (err){
            console.log(err)
        } else {
            //show template with specific campground
            res.render("show", {post: post});
        }
    });
});

    
    
    
    
    
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
})