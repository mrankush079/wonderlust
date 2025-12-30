// const { create } = require("axios");
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const reviewSchema = new Schema({
//     comment: String,
//     rating:{
//         type:Number,
//         min:1,
//         max:5,
//     },
//     createAt: {
//         type:Date,
//         default: Date.now(),
//     },
// });

// module.exports = mongoose.model("Review", reviewSchema);




const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  },
  {
    timestamps: true, // ⭐ createdAt & updatedAt auto
  }
);

module.exports = mongoose.model("Review", reviewSchema);
