const express = require("express");
const router = express.Router();
const { dbSearch, dbAddComment, returnAllMovies } = require("../MongoDB");


// return all movies as JSON
router.get("/", (req, res) => {
  // Search for user input
  const page = req.query.page
  const limit = req.query.limit
  const startIndex = ( page -1 ) * limit
  const endIndex = page * limit
  console.log(`user requested page ${req.query.page} & limit ${req.query.limit}`);

  returnAllMovies().then((e) => {
    const result = e.slice(startIndex,endIndex)
    res.json(result);
  });
});

// return json based on user search term
router.get("/:movie", (req, res) => {
  // Search for user input
  console.log(`searching for ${req.params["movie"]}`);
  dbSearch(req.params["movie"]).then((result) => {
    res.json(result);
  });
});

// post comment to selected movie
router.post("/comment/", (req, res) => {
  // Search for user input
  res.send("A post comment was made: \n" + req.body.comment);
  console.log(`New comment has been made: \n${req.body}`);
  let comment = {
    user: req.body.user,
    comment: req.body.comment,
    rating: req.body.rating,
  };
  dbAddComment(req.body.movie, comment);
});
module.exports = router;
