var mongoose = require("mongoose"),
    Post = require("./models/post"),
    Comment = require("./models/comment");
 
 var data = [
             {
             title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesen.",
             image:"https://images.unsplash.com/photo-1519664699825-ddb2c64076bf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2ffe1d0e41be05c361001e500c54e9e7&auto=format&fit=crop&w=1500&q=80",
             description:"text blah text text blah blah"
        }, {
             title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesen.",
             image:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=da90b7e324f7b8884b268bb4aaf62fcb&auto=format&fit=crop&w=1500&q=80",
             description:"text blah text text blah blah"
        }, {
             title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesen.",
             image:"https://images.unsplash.com/photo-1502665607786-eaa3cd100809?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=50d501e68e2502e772a534ad12af4af4&auto=format&fit=crop&w=1500&q=80",
             description:"text blah text text blah blah"
        }
     ];

 
 function seedDB() {
     //remove all posts
    Post.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Cleared database");
            // data.forEach(function(seed){
            //     Post.create(seed, function(err, seedPost){
            //         if (err) {
            //             console.log(err);
            //         } else {
            //             console.log("Seed post added");
            //             Comment.create(
            //                 {
            //                     text: "This is a great piece of equipment",
            //                     author:"Synth God"
                                
            //                 }, function(err, comment){
            //                     if (err){
            //                         console.log(err)
            //                     } else {
            //                         seedPost.comments.push(comment);
            //                         seedPost.save();
            //                         console.log("created new comment");
            //                     }
            //                 });
            //         }
            //     });
            // });
        }
    });
};
module.exports = seedDB;