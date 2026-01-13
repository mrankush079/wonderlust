const express =  require("express");
const router = express.Router();
const User = require("../models/User.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

// Route to render the signup page

  router.get("/signup", (req, res)=>{
    res.render("users/signup.ejs");
  });



  // Routes set for store user POST-User Signup
  router.post(
    "/signup", 
    wrapAsync(async (req, res)=>{
      try {
        let { username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        req.login(registeredUser, (err)=>{
          if(err) { 
            return next(err);
        }
        req.flash("success", "Welcome to Wonderlust!");
        res.redirect("/listings");
        });
      } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
      }
    })
  );

// Route to render the login page
  router.get("/login", (req, res)=>{
    res.render("users/login.ejs");
  });
  router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),   
    async (req, res)=>{
      req.flash("success", "Welcome back to wonderlust!");
      let redirectUrl = res.locals.redirectUrl || "/listings";
            res.redirect(redirectUrl );
    });


  router.get("/logout", (req, res, next)=>{
    req.logout((err)=>{
      if(err){
        return next(err);
      }
      req.flash("success", "You are logged out!");
      res.redirect("/listings");
    });
  });

module.exports = router;