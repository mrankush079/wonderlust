const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingschema} =require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });




const validationListing= (req, res, next ) => {
  let {error} = listingschema.validate(req.body);

  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }else{
    next();
  }

}

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

router.get("/new", (req, res)=>{
  res.render("listings/new.ejs");
});

// show route
router.get ("/:id", wrapAsync(async (req, res) =>{
  let {id} = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  res.render("listings/show.ejs", {listing});
}));

// create Route
router.post(
  "/", validationListing,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  }));


//Edit Route

router.get ("/:id/edit", wrapAsync(async (req, res) => {
   let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing});
}));

//update Route
router.put("/:id", 
  validationListing,
  wrapAsync(async (req, res)=>{
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
}));


//delete Routes
router.delete("/:id", wrapAsync(async (req, res)=>{
  let {id} = req.params;
 let deletedListing = await Listing.findByIdAndDelete(id);
 console.log(deletedListing);
 res.redirect("/listings");

}));



module.exports = router;








// const express = require("express");
// const router = express.Router();
// const wrapAsync = require("../utils/wrapAsync.js");
// const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
// const listingController = require("../controllers/listings.js");
// const multer = require("multer");
// const { storage } = require("../cloudConfig.js");
// const upload = multer({ storage });

// router
//   .route("/")
//   .get(wrapAsync(listingController.index))
//   .post(
//     isLoggedIn,
//     upload.single("listing[image]"),
//     validateListing,
//     wrapAsync(listingController.createListing)
//   );

// router.get("/new", isLoggedIn, listingController.renderNewForm);

// router.get("/filter/:id", wrapAsync(listingController.filter));
// router.get("/search", listingController.search);

// router
//   .route("/:id")
//   .get(wrapAsync(listingController.showListing))
//   .put(
//     isLoggedIn,
//     isOwner,
//     upload.single("listing[image]"),
//     validateListing,
//     wrapAsync(listingController.updateListing)
//   )
//   .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// router.get(
//   "/:id/edit",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingController.renderEditForm)
// );

// router.get(
//   "/:id/reservelisting",
//   isLoggedIn,
//   wrapAsync(listingController.reserveListing)
// );

// module.exports = router;
