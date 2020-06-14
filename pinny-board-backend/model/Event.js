const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  user_email: {
    type: String,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  micro_code: {
    type: String,
    required: true
  },
  event: {
    type: {
      type: String,
      required: true
    },
    element: {
      type: String
    },
    value: {
      type: String
    },
    message: {
      type: String
    }
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Event", EventSchema);
