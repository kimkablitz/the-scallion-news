// require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var mongoose = require("mongoose")
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");
var PORT = 4000;
var app = express();
var bodyParser = require('body-parser');


app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const keys = require('./keys');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scallion";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })


require("./routes/api-routes")(app);
app.get("/saved", function (req, res) {
  res.render("savedPage");
});
app.get("/", function (req, res) {
  axios.get("https://www.seattletimes.com/").then(function (response) {
    var $ = cheerio.load(response.data);

    $("div.story-list li").each(function (i, element) {

      var result = {};

      result.title = $(this)
        .children("a")
        .text();

      result.link = $(this)
        .children("a")
        .attr("href")

      db.Article.create(result)
        .then(function (dbArticle) {
          // console.log(dbArticle);
        })
        .catch(function (err) {
          console.log(err);
        })
    });
    res.render("homepage");
  });

});

app.listen(PORT, function () {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});

module.exports = app;
