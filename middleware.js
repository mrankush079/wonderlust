module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to Create listing!");
    return res.redirect("/login");
  }
  next();
};