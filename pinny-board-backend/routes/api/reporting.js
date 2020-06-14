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
  const user_name = req.body.user_name;
  const user_email = req.body.user_email;
  const micro_code = req.body.micro_code;
  const species = req.body.species;
  const initial = req.body.initial;
  const loses = req.body.loses;
  const added = req.body.added;
  const register_date = req.body.date;

  const newSales = new Sales({
    user_id,
    user_name,
    user_email,
    micro_code,
    species,
    initial,
    loses,
    added,
    register_date
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
  const user_name = req.body.user_name;
  const user_email = req.body.user_email;
  const micro_code = req.body.micro_code;
  const species = req.body.species;
  const initial = req.body.initial;
  const loses = req.body.loses;
  const added = req.body.added;
  const register_date = req.body.date;

  const newProduction = new Production({
    user_id,
    user_name,
    user_email,
    micro_code,
    species,
    initial,
    loses,
    added,
    register_date
  });

  newProduction
    .save()
    .then(() => res.json("New Production Entry Added! "))
    .catch(err => res.status(400).json("Error:" + err));
});

// @route POST api/reporting/allPlantsSales
// @desc See for what plants there are entries
// @access Private
router.route("/allPlantsSales").post((req, res) => {
  micro_code = req.body.id;
  const all = Sales.find({ micro_code });
  all
    .distinct("species")
    .then(species => {
      res.json(species);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

// @route POST api/reporting/allPlantsProduction
// @desc See for what plants there are entries
// @access Private
router.route("/allPlantsProduction").post((req, res) => {
  micro_code = req.body.id;
  const all = Production.find({ micro_code });
  all
    .distinct("species")
    .then(species => {
      res.json(species);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

// @route POST api/reporting/PlantSales
// @desc See all entries for a specific plant
// @access Private
router.route("/PlantSales").post((req, res) => {
  micro_code = req.body.id;
  species = req.body.species;
  const all = Sales.find({ micro_code });
  all
    .find({ species })
    .sort({ register_date: -1 })
    .then(species => {
      res.json(species);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

// @route POST api/reporting/PlantProduction
// @desc See all entries for a specific plant
// @access Private
router.route("/PlantProduction").post((req, res) => {
  micro_code = req.body.id;
  species = req.body.species;
  const all = Production.find({ micro_code });
  all
    .find({ species })
    .sort({ register_date: -1 })
    .then(species => {
      res.json(species);
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
