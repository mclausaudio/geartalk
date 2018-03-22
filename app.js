var express = require('express'),
    bodyparser = require('body-parser'),
    app = express();

app.use(bodyparser.urlencoded({extended: true}))

app.set("view engine", "ejs");    


    var posts = [
            {title:"tr909", image:"http://www.6am-group.com/wp-content/uploads/2015/09/Roland-909.jpg"},
            {title:"tr909", image:"https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.6am-group.com%2Fwp-content%2Fuploads%2F2015%2F09%2FRoland-909.jpg&imgrefurl=http%3A%2F%2Fwww.6am-group.com%2F909day-tracks&docid=geJj70-fgHAs4M&tbnid=ORoFj8F2aC2UzM%3A&vet=10ahUKEwjqgdXV4_7ZAhUIFHwKHQqGD8IQMwh1KAIwAg..i&w=2400&h=1452&bih=699&biw=1212&q=909%20drum%20machine&ved=0ahUKEwjqgdXV4_7ZAhUIFHwKHQqGD8IQMwh1KAIwAg&iact=mrc&uact=8"},
            {title:"tr909", image:"https://www.google.com/imgres?imgurl=http%3A%2F%2Fwww.6am-group.com%2Fwp-content%2Fuploads%2F2015%2F09%2FRoland-909.jpg&imgrefurl=http%3A%2F%2Fwww.6am-group.com%2F909day-tracks&docid=geJj70-fgHAs4M&tbnid=ORoFj8F2aC2UzM%3A&vet=10ahUKEwjqgdXV4_7ZAhUIFHwKHQqGD8IQMwh1KAIwAg..i&w=2400&h=1452&bih=699&biw=1212&q=909%20drum%20machine&ved=0ahUKEwjqgdXV4_7ZAhUIFHwKHQqGD8IQMwh1KAIwAg&iact=mrc&uact=8"}
        ]


    
app.get("/", function(req, res){
    res.render("landing");
})

// this is called campgrounds in videos
app.get("/posts", function(req, res){
    
    res.render("posts", {posts:posts});
});


app.post("/posts", function(req, res){
    //get data from form and push to array
    var title = req.body.title;
    var image = req.body.image;
    var newPost = {title: title, image: image};
    posts.push(newPost);
    //re direct to posts
    res.redirect("/posts");
});

app.get("/posts/new", function(req, res){
    res.render("new.ejs")
})
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
})