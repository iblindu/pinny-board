require("rootpath")();
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const app = express();
const cors = require("cors");

app.use(cors());

//Bodyparser Middleware
app.use(express.json());

//DB Config
const db = config.get("mongoURI");

//Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

//Use Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;
const server = app.listen(port, function() {
  console.log("Server listening on port " + port);
});
