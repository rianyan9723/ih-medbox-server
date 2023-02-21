const { Schema, model } = require("mongoose");


const medboxSchema = new Schema({
  name: String,
  quantity: Number,
  usage: String,
  expiryDate: String
});

//Translates in a projects collection on mongodb
module.exports = model("Medbox", medboxSchema);
