const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//User Model
var User = require("../../model/User");

// @route POST api/users/add
// @desc Register new user
// @access Private
router.post("/", auth, (req, res) => {
  const { name, email, password, microsere, role } = req.body;
  //Validation
  if (!name || !email || !password || !role) {
    return res.status(400).json("Please enter all fields");
  }

  //Check for existing user
  User.findOne({ email }).then(user => {
    if (user) {
      return res.status(400).json("User already exists! ");
    }

    const newUser = new User({
      name,
      email,
      password,
      microsere,
      role
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(() => res.json("User updated!"))
          .catch(err => res.status(400).json("Error: " + err));
      });
    });
  });
});

// @route GET api/users/all
// @desc Register new user
// @access Private
router.route("/all").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).ljson("Error:" + err));
});

// @route GET api/users/id
// @desc Get user
// @access Public
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      console.log(bcrypt.decodeBase64(user.password));
      res.json(user);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

// @route DELETE api/user/id
// @desc Delete user
// @access Public
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => res.json("Microsera deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route POST api/user/update/id
// @desc Update user
// @access Public
router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.name = req.body.name;
      user.email = req.body.email;
      user.microsere = req.body.microsere;
      user.role = req.body.role;
      if (req.body.password) {
        user.password = req.body.password;
      }

      // Create salt & hash
      if (req.body.password) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then(() => res.json("User updated!"))
              .catch(err => res.status(400).json("Error: " + err));
          });
        });
      } else {
        user
          .save()
          .then(() => res.json("User updated!"))
          .catch(err => res.status(400).json("Error: " + err));
      }
    })
    .catch(err => res.status(400).json("Error: " + err));
});
module.exports = router;
