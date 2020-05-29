const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MicroseraSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  client_id: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  levels: {
    type: Number
  },
  modules: {
    type: Number
  },
  electrovalves: {
    type: Number
  },
  leds: {
    type: Number,
    default: 1
  },
  fans: {
    type: Number,
    default: 1
  },
  heating: {
    type: Boolean,
    default: false
  },
  address: {
    country: {
      type: String,
      required: true
    },
    city: {},
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
    },
    longitude: {
      type: Number,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    }
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Microsera", MicroseraSchema);
