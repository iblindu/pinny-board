const express = require("express");
const router = express.Router();

//use this for private routes
const auth = require("../../middleware/auth");

//Plant Model
var Plant = require("../../model/Plants");
//Sales Model
var Sales = require("../../model/Sales");
//Production Model
var Production = require("../../model/Production");

// @route POST api/reporting/addPlant
// @desc Add New Plant
// @access Private
router.route("/addPlant").post((req, res) => {
  const name = req.body.name;

  //Check for existing plant
  Plant.findOne({ name }).then(plant => {
    if (plant) {
      return res.status(400).json("This plant already exists! ");
    }

    const newPlant = new Plant({
      name
    });

    newPlant
      .save()
      .then(() => res.json("New Plant Added! "))
      .catch(err => res.status(400).json("Error:" + err));
  });
});

// @route GET api/reporting/allPlants
// @desc Get all plants
// @access Public
router.route("/allPlants").get((req, res) => {
  Plant.find()
    .then(plants => res.json(plants))
    .catch(err => res.status(400).json("Error:" + err));
});

// @route DELETE api/reporting/deletePlant
// @desc Delete plant
// @access Public
router.route("/:id").delete((req, res) => {
  Plant.findByIdAndDelete(req.params.id)
    .then(plant => res.json("Plant deleted!"))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route POST api/reporting/addSalesReport
// @desc Add New Sales Report
// @access Private
router.route("/addSalesReport").post((req, res) => {
  const user_id = req.body.user_id;
  const micro_code = req.body.micro_code;
  const species = req.body.species;
  const initial = req.body.initial;
  const loses = req.body.loses;
  const added = req.body.added;

  const newSales = new Sales({
    user_id,
    micro_code,
    species,
    initial,
    loses,
    added
  });

  newSales
    .save()
    .then(() => res.json("New Sales Entry Added! "))
    .catch(err => res.status(400).json("Error:" + err));
});

// @route POST api/reporting/addProductionReport
// @desc Add New Production Report
// @access Private
router.route("/addProductionReport").post((req, res) => {
  const user_id = req.body.user_id;
  const micro_code = req.body.micro_code;
  const species = req.body.species;
  const initial = req.body.initial;
  const loses = req.body.loses;
  const added = req.body.added;

  const newProduction = new Production({
    user_id,
    micro_code,
    species,
    initial,
    loses,
    added
  });

  newProduction
    .save()
    .then(() => res.json("New Production Entry Added! "))
    .catch(err => res.status(400).json("Error:" + err));
});

module.exports = router;
