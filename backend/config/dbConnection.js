const mongoose = require("mongoose");
const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then((data) => {
      console.log("database connected", data.connection.host);
    })
    .catch((error) => {
      console.log("error occured", error);
    });
};
module.exports = dbConnection;
