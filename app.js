var express = require('express'),
    bodyparser = require('body-parser'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require("passport"),
    localStrategy = require ("passport-local"),
    methodOverride = require("method-override"),
    Post = require("./models/post"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");
    
var commentsRoutes = require("./routes/comments.js"),
    postRoutes = require("./routes/posts.js"),
    indexRoutes = require("./routes/index.js");

mongoose.connect('mongodb://localhost/gear_talk');
app.use(bodyparser.urlencoded({extended: true}))
app.set("view engine", "ejs"); 
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
//seed database
// seedDB();


//Passport config
app.use(require("express-session")({
    secret: "Silva Electronics",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/posts", postRoutes);
app.use("/posts/:id/comments", commentsRoutes);
app.use("/", indexRoutes);
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
});