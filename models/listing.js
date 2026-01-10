// Importing mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");


// Destructuring Schema from mongoose
const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: {
    filename: { type: String, required: true },
    url: { type: String, required: true }
  },
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type: Schema.Types.ObjectId,
      ref:"Review",
    },

  ]
});

listingSchema.post("findOneAndDelete", async (listing) =>{
  if(listing) {
  await Review.deleteMany({_id : {$in: listing.reviews}});
 }
});

module.exports = mongoose.model("Listing", listingSchema);


// Creating the Listing model
const Listing = mongoose.model("Listing", listingSchema);

// Exporting the Listing model
module.exports = Listing;

