const config = require("config.json");
const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI;

mongoose
  .connect(
    "mongodb+srv://iuliadb:pinnyboard@cluster1-ry4sc.mongodb.net/Microsera?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDb successfully connected"))
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

module.exports = {
  User: require("../users/user.model")
};
