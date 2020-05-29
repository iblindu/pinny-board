const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductionSchema = new Schema({
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  micro_code: {
    type: String,
    required: true,
    unique: true
  },
  species: {
    type: String,
    required: true
  },
  initial: {
    type: Number,
    required: true
  },
  loses: {
    type: Number,
    required: true
  },
  added: {
    type: Number,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Production", ProductionSchema);
