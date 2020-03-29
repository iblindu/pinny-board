const express = require("express");
const router = express.Router();

//use this for private routes
const auth = require("../../middleware/auth");

//User Model
var Microsera = require("../../model/Microsere");

// @route POST api/microsere/add
// @desc Add New Microsera
// @access Private
router.route("/add").post((req, res) => {
  const code = req.body.code;
  const type = req.body.type;
  const city = req.body.city;
  const street = req.body.street;
  const number = req.body.number;
  const facility = req.body.facility;

  //Validation
  if (!code || !type || !city || !street || !number || !facility) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check for existing microsera
  Microsera.findOne({ code }).then(microsera => {
    if (microsera) {
      return res.status(400).json({ msg: "This microsera already exists! " });
    }

    const newMicrosera = new Microsera({
      code,
      type,
      address: { city, street, number, facility }
    });

    newMicrosera
      .save()
      .then(() => res.json("Microsera added!"))
      .catch(err => res.status(400).json("Error:" + err));
  });
});

// @route GET api/microsere/all
// @desc Register new user
// @access Private
router.route("/all").get((req, res) => {
  Microsera.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).ljson("Error:" + err));
});

module.exports = router;
