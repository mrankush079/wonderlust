const Listing = require("../models/listing");

// index route

module.exports.index = async (req, res) => {
  try {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).send("Internal Server Error");
  }
};


//new Routes
module.exports.renderNewForm = (req, res)=>{
  res.render("listings/new.ejs");
};



// show route
module.exports.showListing = async (req, res) =>{
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
};



//create Route
module.exports.createListing = async (req, res, next) => {
   let url = req.file.path;
   let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url: url, filename: filename};
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  };


  //Edit Route
  module.exports.editListing = async (req, res) => {
     let {id} = req.params;
    const listing = await Listing.findById(id);
      if (!listing) {
      req.flash("error", "Listing You are looking for does not exist!");
      res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing});
  };


  //update Route
  module.exports.updateListing = async (req, res)=>{
  let {id} = req.params;
  let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
  
  if (typeof req.file !== "undefined"){ 
  let url = req.file.path;
  let filename = req.file.filename;

  listing.image = {url: url, filename: filename};
  await listing.save();
  }
  
   req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};



//delete Routes
module.exports.destroyListing = async (req, res)=>{
  let {id} = req.params;
 let deletedListing = await Listing.findByIdAndDelete(id);
 console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
 res.redirect("/listings");

};  