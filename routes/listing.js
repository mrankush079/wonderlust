
const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validationListing } = require("../middleware.js");






// index route
router.get("/", wrapAsync(async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).send("Internal Server Error");
  }
}));

//new Routes 

router.get("/new", isLoggedIn, (req, res)=>{
  res.render("listings/new.ejs");
});

// show route
router.get ("/:id",  
  wrapAsync(async (req, res) =>{
  let {id} = req.params;
  const listing = await Listing.findById(id) 
  .populate({path: "reviews",
    populate: {
      path: "author"
    },
  }) 
  .populate("owner"); 
  if (!listing) {
    req.flash("error", "Listing You are looking for does not exist!");
    res.redirect("/listings");
  } 
  console.log(listing);
  res.render("listings/show.ejs", {listing});
}));

//create Route
router.post(
  "/", 
  isLoggedIn,
  validationListing,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  }));

//Edit Route

router.get
 ("/:id/edit",
  isLoggedIn,
  isOwner,
   wrapAsync(async (req, res) => {
   let {id} = req.params;
  const listing = await Listing.findById(id);
    if (!listing) {
    req.flash("error", "Listing You are looking for does not exist!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing});
}));

//update Route
router.put( 
  "/:id", 
  isLoggedIn,
  isOwner,
  validationListing,
  wrapAsync(async (req, res)=>{
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
   req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
}));


//delete Routes
router.delete("/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res)=>{
  let {id} = req.params;
 let deletedListing = await Listing.findByIdAndDelete(id);
 console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
 res.redirect("/listings");

}));



module.exports = router;
