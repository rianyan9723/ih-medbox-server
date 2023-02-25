const { Schema, model } = require("mongoose");


const medicationSchema = new Schema({
  name: String,
  quantity: Number,
  usage: String,
  expiryDate: String
});

//Translates in a projects collection on mongodb
module.exports = model("Medication", medicationSchema);