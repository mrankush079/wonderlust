const express =  require("express");
const router = express.Router();
const User = require("../models/User.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

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
        req.flash("success", "Welcome to Wonderlust!");
        res.redirect("/listings");
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
    "/login", passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),   
    wrapAsync(async (req, res)=>{
      req.flash("success", "Welcome back to wonderlust!");

      res.redirect("/listings");
    })
  );


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