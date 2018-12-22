var db = require("../models");

module.exports = function(app) {
  app.get("/articles", function(req, res) {
    db.Article.find()
      .limit(20)
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.put("/articles/:id", function(req, res) {
    db.Article.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isSaved: true } }
    )

      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.delete("/articles", function(req, res) {
    db.Article.remove( { } )
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.get("/api/saved", function(req, res) {
    db.Article.find({ isSaved: true })

      .then(function(savedArticles) {
        res.json(savedArticles);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.get("/saved/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })

      .then(function(savedArticle) {
        res.json(savedArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.put("/saved/:id", function(req, res) {
    db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { isSaved: false } }
      )

      .then(function(savedArticle) {
        res.json(savedArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};


// Route for grabbing a specific Article by id, populate it with it's note
// app.get("/articles/:id", function(req, res) {
//     // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//     db.Article.findOne({ _id: req.params.id })
//       // ..and populate all of the notes associated with it
//       .populate("comment")
//       .then(function(dbArticle) {
//         // If we were able to successfully find an Article with the given id, send it back to the client
//         res.json(dbArticle);
//       })
//       .catch(function(err) {
//         // If an error occurred, send it to the client
//         res.json(err);
//       });
//   });

// // Route for saving/updating an Article's associated Note
// app.post("/articles/:id", function(req, res) {
//     // Create a new note and pass the req.body to the entry
//     db.Comment.create(req.body)
//       .then(function(dbComment) {
//         // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
//         // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//         // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//         return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbComment._id }, { new: true });
//       })
//       .then(function(dbArticle) {
//         // If we were able to successfully update an Article, send it back to the client
//         res.json(dbArticle);
//       })
//       .catch(function(err) {
//         // If an error occurred, send it to the client
//         res.json(err);
//       });
//   });
  