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
  const client_id = req.body.client_id;
  const type = req.body.type;
  const levels = req.body.levels;
  const modules = req.body.modules;
  const electrovalves = req.body.electrovalves;
  const leds = req.body.leds;
  const fans = req.body.fans;
  const heating = req.body.heating;
  const country = req.body.country;
  const city = req.body.city;
  const street = req.body.street;
  const number = req.body.number;
  const facility = req.body.facility;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;

  //Check for existing microsera
  Microsera.findOne({ code }).then(microsera => {
    if (microsera) {
      return res.status(400).json("This microsera already exists! ");
    }

    const newMicrosera = new Microsera({
      code,
      client_id,
      type,
      levels,
      modules,
      electrovalves,
      leds,
      fans,
      heating,
      address: { country, city, street, number, facility, longitude, latitude }
    });

    newMicrosera
      .save()
      .then(() => res.json("New Microsera Added! "))
      .catch(err => res.status(400).json("Error:" + err));
  });
});

// @route GET api/microsere/all
// @desc Get all microsere
// @access Public
router.route("/all").get((req, res) => {
  Microsera.find()
    .then(microsere => res.json(microsere))
    .catch(err => res.status(400).json("Error:" + err));
});

// @route POST api/microsere/find
// @desc Find details about microsera
// @access Public
router.route("/find").post((req, res) => {
  code = req.body.code;
  Microsera.findOne({ code })
    .then(microsera => {
      console.log(microsera);
      res.json({
        code: microsera.code,
        type: microsera.type,
        city: microsera.address.city,
        street: microsera.address.street,
        number: microsera.address.number,
        facility: microsera.address.facility
      });
    })
    .catch(err => res.status(400).json("Error:" + err));
});
// @route GET api/microsere/id
// @desc Get microsera
// @access Public
router.route("/:id").get((req, res) => {
  Microsera.findById(req.params.id)
    .then(microsera => res.json(microsera))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route DELETE api/microsere/id
// @desc Delete microsera
// @access Public
router.route("/:id").delete((req, res) => {
  Microsera.findByIdAndDelete(req.params.id)
    .then(microsera => res.json("Microsera deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route UPDATE api/microsere/id
// @desc Update microsera
// @access Public
router.route("/update/:id").post((req, res) => {
  Microsera.findById(req.params.id)
    .then(microsera => {
      microsera.code = req.body.code;
      microsera.client_id = req.body.client_id;
      microsera.type = req.body.type;
      microsera.levels = req.body.levels;
      microsera.modules = req.body.modules;
      microsera.electrovalves = req.body.electrovalves;
      microsera.leds = req.body.leds;
      microsera.fans = req.body.fans;
      microsera.heating = req.body.heating;
      microsera.address.country = req.body.country;
      microsera.address.city = req.body.city;
      microsera.address.street = req.body.street;
      microsera.address.number = req.body.number;
      microsera.address.facility = req.body.facility;
      microsera.address.longitude = req.body.longitude;
      microsera.address.latitude = req.body.latitude;

      microsera
        .save()
        .then(() => res.json("Microsera updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
