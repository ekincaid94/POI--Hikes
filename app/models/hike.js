"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const hikeSchema = new Schema({
  location: String,
  distance: Number,
  description: String,
  category: String,
});

module.exports = Mongoose.model("Hike", hikeSchema);
