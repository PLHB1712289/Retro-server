const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(process.env.URL_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection
    .once("open", () => console.log("Database connection is successful!!"))
    .on("error", () => console.log("Database connection is failed!!"));
};

module.exports = connect;
