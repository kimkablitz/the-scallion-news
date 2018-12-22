var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    title: String,
    body: String
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;