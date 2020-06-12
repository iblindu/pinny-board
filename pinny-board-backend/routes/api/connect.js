const express = require("express");
const router = express.Router();
var mqtt = require("mqtt");

//Event Model
var Event = require("../../model/Event");

//------ MQTT broker settings and topics
// const broker = "mqtt://mqtt-ardu-micro:f4d2cd04d09866df@broker.shiftr.io";
// const mqttUserName = "mqtt-ardu-micro";
// const mqttPass = "f4d2cd04d09866df";
const min = "1000000000";
const max = "9999999999";
function between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const clientID = between(min, max);

router.route("/all").get((req, res) => {
  Microsera.find()
    .then(microsere => res.json(microsere))
    .catch(err => res.status(400).ljson("Error:" + err));
});

// @route POST api/connect/gettemp
// @desc Get values for humidity and temperature
// @access Public
router.route("/gettemp").post((req, res) => {
  const broker = req.body.broker;
  const topic_pub_temperature = "temperature";
  var client = mqtt.connect(broker, {
    clientId: clientID
  });

  client.on("connect", function() {
    client.subscribe(topic_pub_temperature);
  });

  client.on("message", function(topic, message) {
    if (topic === topic_pub_temperature) {
      var temperature = message.toString();
      res.json({
        temperature: temperature
      });
      client.end();
    }
  });

  client.unsubscribe(topic_pub_temperature);
});

// @route POST api/connect/gethum
// @desc Get values for humidity
// @access Public
router.route("/gethum").post((req, res) => {
  const broker = req.body.broker;
  const topic_pub_humidity = "humidity";

  var client = mqtt.connect(broker, {
    clientId: clientID
  });

  client.on("connect", function() {
    client.subscribe(topic_pub_humidity);
  });

  client.on("message", function(topic, message) {
    if (topic === topic_pub_humidity) {
      var humidity = message.toString();
      res.json({
        humidity: humidity
      });
      client.end();
    }
  });

  client.unsubscribe(topic_pub_humidity);
});

// @route POST api/connect/control
// @desc Power on/off
// @access Public
router.route("/control").post((req, res) => {
  const broker = "mqtt://mqtt-ardu-micro:f4d2cd04d09866df@broker.shiftr.io";
  const micro_code = req.body.micro_id;
  const client_id = req.body.client_id;
  const user_id = req.body.user_id;
  const type = "control";
  const element = req.body.element;
  const value = req.body.value;

  const topic = client_id + "/" + element;
  console.log(topic);
  // This is here just for tests
  const topic_sub_motor_command = "motor_command";
  var client = mqtt.connect(broker, {
    clientId: clientID
  });
  client.on("connect", function() {
    client.publish(topic_sub_motor_command, value);
    client.end();
  });

  //Add event to database
  const newEvent = new Event({
    micro_code,
    user_id,
    event: { type, element, value }
  });
  newEvent
    .save()
    .then(() => res.json("New Event Entry Added! "))
    .catch(err => res.status(400).json("Error:" + err));
});

module.exports = router;
