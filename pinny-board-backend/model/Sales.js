const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalesSchema = new Schema({
  user_id: {
    type: Object,
    required: true
  },
  micro_code: {
    type: Object,
    required: true
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

module.exports = mongoose.model("Sales", SalesSchema);
