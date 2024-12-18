const mongoose = require("mongoose");

const ConnectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the database");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

module.exports = ConnectToDb;
