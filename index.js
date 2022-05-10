const express = require("express");
const app = express();
const cors = require('cors')
const movieRouter = require("./Routes/movieRouter");
// app.use(cors() ) 
app.use(express.json()); //Parse URL-encoded bodies
app.use(cors())

// Main site port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// EJS view engine
// app.set('view engine', 'ejs')

// middleware logging IP address
// const logger = (req, res, next) => {
//   // console.log(`using ${req.ip}`);
//   fs.appendFile('log_file.txt', `IP: ${req.ip} \n`,(err)=>{})
//   next();
// };

// app.use(logger)

console.log("server coming online ...");
//static folder
// app.use(express.static(path.join(__dirname, '.')));
console.log("server online");

//request for movies page
app.use("/movies", movieRouter);

//request for home page
app.get("/", (req, res) => {
  //   res.render('movies')
  console.log("main page requested");
  res.status(200).send("you have requested the main page");
});
