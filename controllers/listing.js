const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { listingSchema, reviewSchema } = require("../schema");
const { validateListing } = require("../middleware");
const { isLoggedIn, isOwner } = require("../middleware");

module.exports.index = async (req, res) => {
  let listings = await Listing.find({});

  res.render("listings/index", { listings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

module.exports.show = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listing");
  }
  res.render("listings/show", { listing });
};

module.exports.createNewListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;

  let list = new Listing(req.body.listing);
  list.owner = req.user._id;
  list.image = { url, filename };
  await list.save();
  req.flash("success", "New listing sucessfully created");
  res.redirect("/listing");
};

module.exports.renderEditListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listing");
  }
  let originalImage = listing.image.url;
  originalImage = originalImage.replace("/upload", "/upload/w_250");
  res.render("listings/edit", { listing, originalImage });
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    {
      new: true,
    }
  );
  if (typeof req.file != "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", " listing sucessfully Edited");

  res.redirect(`/listing/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "listing sucessfully deleted");

  res.redirect("/listing");
};
