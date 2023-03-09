const { Schema, model } = require("mongoose");


const medicationSchema = new Schema({
  name: String,
  quantity: Number,
  purpose: String,
  usage: String,
  dosage: String,
  expiryDate: String,
  otherInfo: String
});

//Translates in a projects collection on mongodb
module.exports = model("Medication", medicationSchema);