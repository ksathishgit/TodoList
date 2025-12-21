const mongoose = require("mongoose");
module.exports = mongoose.model(
  "Task",
  new mongoose.Schema({
    taskName: String,
    description: String,
    startDate: Date,
    endDate: Date,
    effort: Number,
    status: String,
  })
);
