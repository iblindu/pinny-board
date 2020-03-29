const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MicroseraSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: false
  },
  type: {
    type: String,
    required: true
  },
  address: {
    city: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    facility: {
      type: String,
      required: true
    }
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Microsera", MicroseraSchema);
