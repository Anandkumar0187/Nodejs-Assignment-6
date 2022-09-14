const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost/blogs");

const blogSchema = new mongoose.Schema({
    // Your code goes here
    topic: String,
    description: String,
    posted_at: {type : Date, default : Date.now},
    posted_by: String
},{versionKey:false})

const Blog = mongoose.model('blogs', blogSchema);

module.exports = Blog;