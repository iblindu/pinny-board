const express = require("express");
const router = express.Router();

//use this for private routes
const auth = require("../../middleware/auth");

//User Model
var Plant = require("../../model/Plants");

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

module.exports = router;
