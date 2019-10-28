const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });

      return res.status(200).json({message:'Congartulations, you are registered'})
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { email };
          const token = jwt.sign(payload, keys.secretOrKey, {
            expiresIn: '1h'
          });
          return res
            .cookie('token', token, { httpOnly: true })
            .json({
              success: true,
              user: user
            })
            .status(200);

      } else {
        return res
          .status(400)
          .json({ password: "Password incorrect" });
      }
    });
  });
});


//route get
//display user info if token is valid
//not public access
const authToken = require('../../validation/authToken.js');

router.get("/auth", authToken, function(req, res){

  const email = req.email

  User.findOne({email}).then(user =>{
    if(!user){
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    else{
      return res.json({
        name:user.name,
        email: user.email,
        message:'you r authentified'
      })
    }
  }).catch(err => console.log(err));

});


router.get('/checktoken', authToken, function(req, res){
  return res.status(200);
});


module.exports = router;