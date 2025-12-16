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

app.get("/listings", async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).send("Internal Server Error");
  }
});

//new Routes 

app.get("/listings/new", (req, res)=>{
  res.render("listings/new.ejs");
});

// show route
app.get ("/listings/:id", async (req, res) =>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", {listing});
});

// create Route



// create Route

app.use ("/listing", 
  wrapAsync(async (req, res, next) => {
 
    const newListing = new Listing(req.body.Listing);
    await newListing.save();
    res.redirect("/listing");
}));





// app.post(
//   "/listings",
//   upload.single("listing[image]"),
//   async (req, res) => {

//     const listingData = req.body.listing;

//     if (!req.file) {
//       return res.status(400).send("Image upload required");
//     }

//     const newListing = new Listing(listingData);

//     // 👇 IMPORTANT PART
//     newListing.image = {
//       url: `/uploads/${req.file.filename}`,
//       filename: req.file.filename
//     };

//     await newListing.save();
//     res.redirect("/listings");
//   }
// );





//Edit Route

app.get ("/listings/:id/edit", async (req, res) => {
   let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing});
})

//update Route
app.put("/listings/:id", async (req, res)=>{
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
});


//delete Routes
app.delete("/listings/:id", async (req, res)=>{
  let {id} = req.params;
 let deletedListing = await Listing.findByIdAndDelete(id);
 console.log(deletedListing);
 res.redirect("/listings");

})



// app.post("/listings", async (req, res) => {
//   const newlisting = new Listing(req.body.listing);
//   await newlisting.save();
//   res.redirect("/listings");
// });


app.all("/{*splat}", (req, res, next)=>{
  next(new ExpressError(404, "Page Not Found ! "));

})

app.use ((req, res, next)=> {
  let {statusCode, message} = err;
  res.status(statusCode).send(message);
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
