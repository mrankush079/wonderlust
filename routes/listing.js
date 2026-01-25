
const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validationListing } = require("../middleware.js");

// use multer for file uploads parsing
const multer  = require('multer')

const { storage } = require("../cloudConfig.js");
// const upload = multer({ storage: storage });
const upload = multer({ storage: storage });


const listingController = require("../controllers/listing.js");


//create Route
//create Route

router.route("/")

.get ( wrapAsync (listingController.index))

.post ( 
  isLoggedIn, 
   upload.single('listing[image]'), 
    validationListing,
    wrapAsync  (
      listingController.createListing));
  
//new Routes 

router.get("/new", isLoggedIn, listingController.renderNewForm);


//show, update, delete Routes 

router.route("/:id")

.get ( wrapAsync (listingController.showListing))

.put( isLoggedIn, isOwner, validationListing,
  wrapAsync(listingController.updateListing )
 )

 .delete( isLoggedIn, isOwner,
  wrapAsync(listingController.destroyListing)
  );



//Edit Route

router.get
 ("/:id/edit",
  isLoggedIn,
  isOwner,
   wrapAsync(listingController.editListing)
 );


  
module.exports = router;
