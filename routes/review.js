// const express =  require("express");
// const router = express.Router();
// const ExpressError = require("../utils/ExpressError.js");
// const wrapAsync = require("../utils/wrapAsync.js");
// const Review = require("../models/review.js");
// const { reviewSchema } = require("../schema.js");
// const Listing = require("../models/listing.js");




// const validationListing= (req, res, next ) => {
//   let {error} = listingschema.validate(req.body);

//   if(error){
//     let errMsg = error.details.map((el) => el.message).join(",");
//     throw new ExpressError(400, errMsg);
//   }else{
//     next();
//   }

// }



// // //Post Review Route

// router.post("/", async (req, res) => {

//     let listing = await Listing.findById(req.params.id);

//     let newReview = new Review(req.body.review);

//     listing.reviews.push(newReview);  // push the new review

//     await newReview.save();   // SAVE the review
//     await listing.save();     // SAVE the listing

//   res.redirect(`/listings/${listing._id}`);

// });


// //Delete review Route

// router.delete(
//   "/:reviewId",
//   wrapAsync(async (req, res)=>{
//     let  {id, reviewId }= req.params;

//     await Listing.findByIdAndUpdate(id, {$pull : {reviews : reviewId}}); 
//     await Review.findByIdAndDelete(reviewId);
//     res.redirect(`/listings/${id}`);
//   })
// );


// module.exports = router;






const express = require("express");
const router = express.Router({ mergeParams: true });

const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

// =========================
// POST REVIEW
// =========================
router.post(
  "/",
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      throw new ExpressError(404, "Listing not found");
    }

    const newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
  })
);

// =========================
// DELETE REVIEW
// =========================
router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });

    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
