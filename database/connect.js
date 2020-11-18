const mongoose = require("mongoose");
const resources = require("../resources");

const connect = () => {
  mongoose.connect(resources.URL_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection
    .once("open", () => console.log("Database connection is successful!!"))
    .on("error", () => console.log("Database connection is failed!!"));
};

module.exports = connect;
