var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    comments: [
            {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Comment"
            }
        ],
});

module.exports = mongoose.model("Post", postSchema);