const mongoose = require('mongoose')

//defining the structure of the document
let blogPostSchema = mongoose.Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: {type: Date, default: Date.now },

})

// convert the schema into a model class which you can use in your code
// A model is a class with which we construct documents.
// In this case, each document will be a kitten with properties and behaviors as declared in our schema.
const blogPost = mongoose.model('blogPost', blogPostSchema)

module.exports = blogPost
