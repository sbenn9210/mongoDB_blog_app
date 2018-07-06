const express = require('express')
const mongoose = require('mongoose')
const app = express()
const blogPost = require('./schemas/blogPost')
const bodyParser = require('body-Parser')

//allows us to parse json elements
app.use(bodyParser.json())
//give and recieve body elements through the URL
app.use(bodyParser.urlencoded({extended:true}))

//if the database does not exist then it will create it
// make sure the mongodb server is running using mongod at terminal
mongoose.connect('mongodb://localhost/blog')
//get the database connection object
var db = mongoose.connection


//get all the documents in the blogPost collection

app.get('/blogList/:blogPostId', function(req,res) {

  let blogPostId = req.params.blogPostId

  blogPost.findById(blogPostId,function(error,blogPost) {
    res.json(blogPost)
  })

})

app.get('/', function(req,res) {
  res.send("Hello World!")
})

app.get('/blogList', function(req,res) {
  blogPost.find(function(error,blogPosts) {
    res.json(blogPosts)
  })
})

// create posting to a route

app.post('/blogList', function(req,res) {
  var createBlogPost = new blogPost()

  createBlogPost.title = req.body.title
  createBlogPost.author = req.body.author
  createBlogPost.body = req.body.body

  createBlogPost.save(function(error,blogPost) {
    if(error != null) {
      console.error(error)
      return
    }
    console.log(blogPost)
  })
})

//updating a post
app.put('/blogList/:blogPostId', function(req,res) {
  blogPost.findOneAndUpdate({
    _id:req.params.blogPostId
  },
  {$set:{body:req.body.body}},
  {upsert:true},
    function(error,blogPost) {
      if(error != null) {
        console.error(error)
        return
      }
      console.log(blogPost)
    })
})

// //inserting a new blogPost
// let firstPost = new blogPost({title : "Programming", author : "Shawn Benny", body: "This is not the easiest stuff to learn but I am getting better"})
// firstPost.save(function(error,newBlogPost) {
//   if(error != null) {
//     console.error(error)
//     return
//   }
//   console.log(newBlogPost)
// })

//deleting a post
app.delete('/blogList:blogPostId', function(req,res) {
  blogPost.findOneAndRemove({
    _id:req.params.blogPostId
  },
  function(error,blogList) {
    if(error != null) {
      console.error(error)
      return
    }
    console.log(blogList)
  })
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))
