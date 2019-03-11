const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
//const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load Superuser model
const Superuser = require("../../models/Superuser");

// @route POST dashboard/superusers/register
// @desc Register superuser
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Superuser.findOne({ email: req.body.email }).then(superuser => {
    if (superuser) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newSuperuser = new Superuser({
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newSuperuser.password, salt, (err, hash) => {
          if (err) throw err;
          newSuperuser.password = hash;
          newSuperuser
            .save()
            .then(superuser => res.json(superuser))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST dashboard/superusers/login
// @desc Login superuser and return JWT token
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

  // Find superuser by email
  Superuser.findOne({ email }).then(superuser => {
    // Check if superuser exists
    if (!superuser) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, superuser.password).then(isMatch => {
      if (isMatch) {
        // Superuser matched
        // Create JWT Payload
        const payload = {
          id: superuser.id,
          first: superuser.first,
          last: superuser.last
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 1800 // 30 minutes in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
