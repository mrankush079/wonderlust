// app.js


const multer = require("multer");
const upload = multer({ dest: "uploads/" });


const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const { request } = require("http");
const methodOverride = require ("method-override");
const ejsMate = require ("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingschema} =require("./schema.js");
const Review = require("./models/review.js");


const listings = require("./routes/listing.js");

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


app.use("/uploads", express.static("uploads"));


app.get("/", (req, res) => {
  res.send("Hi, I am root");
});



app.use("/listings",listings);

// //Reviews
// //Post Review Route

app.post("/listings/:id/reviews", async (req, res) => {

    let listing = await Listing.findById(req.params.id);

    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);  // push the new review

    await newReview.save();   // SAVE the review
    await listing.save();     // SAVE the listing

  res.redirect(`/listings/${listing._id}`);

});


//Delete review Route

app.delete(
  "/listings/:id/reviews/:reviewId",
  wrapAsync(async (req, res)=>{
    let  {id, reviewId }= req.params;

    await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewId}}); 
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
  })
);




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
