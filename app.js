const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const { toPlainObject } = require("lodash");
// mongoose.connect("mongodb://localhost:27017/blogDB");
mongoose.connect("mongodb://127.0.0.1/blogDB");

const blogSchema = new mongoose.Schema({
  title : String,
  content : String
});

const Blog = mongoose.model("blog", blogSchema);

const homeStartingContent = "A blog, short for weblog, is a frequently updated web page used for personal commentary or business content. Blogs are often interactive and include sections at the bottom of individual blog posts where readers can leave comments.Most are written in a conversational style to reflect the voice and personal views of the blogger. Some businesses use blogs to connect with target audiences and sell products.Blogs were originally called weblogs, which were websites that consisted of a series of entries arranged in reverse chronological order, so the newest posts appeared at the top. They were frequently updated with new information about various topics.";
const aboutContent = "Daily Journal is a Professional Blog website Platform. Here we will provide you only interesting content, which you will like very much. We're dedicated to providing you the best of Blog website, with a focus on dependability and Creating and deleting blogs. We're working to turn our passion for Blog website into a booming online website. We hope you enjoy our Blog website as much as we enjoy offering them to you.I will keep posting more important posts on my Website for all of you. Please give your support and love.Thanks For Visiting Our Site";
const contactContent = "Welcome to Daily Journal! Please email us if you have any queries about the site, advertising, or anything else. We will revert you as soon as possible...! Thank you for contacting us! Kindly email on the following address: nishadkanago@gmail.com. What's App No. 7620132539";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

function update(){
  document.getElementById("title").value = "This is an auto-generated value";
 }

app.get("/", function(req, res){
  Blog.find({}, function(err, arr){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: arr
    });
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  // const post = {
  //   title: req.body.postTitle,
  //   content: req.body.postBody
  // };

  const blog1 = new Blog({
    title : req.body.postTitle,
    content : req.body.postBody
  });

  blog1.save(function(err){
    if (! err) res.redirect("/");
  });
  posts.push(blog1);

});

app.get("/posts/:postName", function(req, res){
  // const requestedTitle = _.lowerCase(req.params.postName);
  Blog.findOne({title : req.params.postName}, function(err, final){
    if (! err){
      res.render("post", {
        title: final.title,
        content: final.content
      });
    }
  });

});

app.post("/new", function(req, res){
  res.redirect("/compose");
});

app.post("/delete", function(req, res){
  const del_id = req.body.delete_item;
  Blog.deleteOne({_id : del_id}, function(err){
    if (! err) res.redirect("/");
  });
});

app.post("/update", function(req, res){
  const upd_id = req.body.update_item;
  Blog.findOne({_id : upd_id}, function(err, up_val){
    if (! err){
      var t = up_val.title;
      var d = up_val.content;
      res.render("update", {title1 : t, desc1 : d});
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

// Blog.updateOne({_id : upd_id}, {title : t, content : d}, function(err){
//   if (! err) res.redirect("/");
// });