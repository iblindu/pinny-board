const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false
  }
});

module.exports = mongoose.model("Plant", PlantSchema);
