// app.js



const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require ("method-override");
const ejsMate = require ("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");



const listings = require("./routes/listing.js");
const reviews = require ("./routes/review.js");


const app = express();
const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to DB");
}
main().catch((err) => {
  console.error("Error connecting to DB:", err);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use (express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


// app.use("/uploads", express.static("uploads"));

const sessionOptions = {
  secret : "mysupersecretcode",
  resave: false,
  SaveUninitialized : true
};


app.use(session(sessionOptions));


app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.use("/listings",listings);

app.use("/listings/:id/reviews",reviews);

app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});



app.use ((err, req, res, next)=> {
  let {statusCode=500, message="Something went wrong!"} = err;
  res.status(statusCode).render("error.ejs",{message});

});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
