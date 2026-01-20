
const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validationListing } = require("../middleware.js");



const listingController = require("../controllers/listing.js");


// index route
router.get("/", 
  wrapAsync(listingController.index)
);

//new Routes 

router.get("/new", isLoggedIn, listingController.renderNewForm);

// show route
router.get ("/:id",  
  wrapAsync(listingController.showListing));

//create Route
router.post(
  "/", 
  isLoggedIn,
  validationListing,
  wrapAsync(listingController.createListing)
);

//Edit Route

router.get
 ("/:id/edit",
  isLoggedIn,
  isOwner,
   wrapAsync(listingController.editListing)
 );

//update Route
router.put( 
  "/:id", 
  isLoggedIn,
  isOwner,
  validationListing,
  wrapAsync(listingController.updateListing )
 );


//delete Routes
router.delete("/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
  );


  
module.exports = router;
