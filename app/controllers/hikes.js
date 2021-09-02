"use strict";
const Hike = require("../models/hike");
const User = require("../models/user");

const Hikes = {
  home: {
    handler: function (request, h) {
      return h.view("home", { title: "Take a Hike" });
    },
  },
  report: {
    handler: async function (request, h) {
      const hikes = await Hike.find().populate("donor").lean();
      return h.view("report", {
        title: "Take a hike",
        hikes: hikes,
      });
    },
  },
  hike: {
    handler: async function (request, h) {
      const id = request.auth.credentials.id;
      const user = await User.findById(id);
      const data = request.payload;
      const newHike = new Hike({
        location: data.location,
        distance: data.distance,
        description: data.description,
        category: data.category,
      });
      await newHike.save();
      return h.redirect("/report");
    },
  },
};

module.exports = Hikes;
