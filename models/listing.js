// Importing mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


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
  country: String
});

module.exports = mongoose.model("Listing", listingSchema);


// Creating the Listing model
const Listing = mongoose.model("Listing", listingSchema);

// Exporting the Listing model
module.exports = Listing;
