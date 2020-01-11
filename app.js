const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogDB",{useUnifiedTopology: true, useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post",postSchema);


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

// const posts = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",function(req,res){
    // console.log(posts);

  Post.find({},function(err,posts){
    if(!err){
    console.log("Successfully Done!");
    res.render("home",{
      HomeContent: homeStartingContent,
      posts:posts

    })

  }
  });
  // res.render("home",{
  //   HomeContent: homeStartingContent,
  //   posts:posts
  //
  // })
});

app.get("/about",function(req,res){

  res.render("about",{AboutContent: aboutContent})

});

app.get("/contact",function(req,res){
  res.render("contact",{ContactContent: contactContent})
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.get("/posts/:topic",function(req,res){
  //console.log(req.params.topic);
// const title = _.lowerCase(req.params.topic);
  const id = req.params.topic;
  Post.find({},function(err,posts){
    if(!err){
  posts.forEach(function(post){
    if(post.id === id ){
      res.render("post",{post:post});
     }
     //else{
    //   console.log("post title = "+ post.title);
    // }
  });
}
  });
});
app.post("/compose",function(req,res){
  const post = new Post( {
      title: req.body.title,
      content: req.body.postBody
  });

  //At the moment, when you compose a post and redirect to the root route, sometimes the post is not yet saved and doesn’t show up on the home page.

  // Goal: Add a callback to the save method to only redirect to the home page once save is complete with no errors.
  post.save(function(err){
    if(!err)
    res.redirect("/");
  });


});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
