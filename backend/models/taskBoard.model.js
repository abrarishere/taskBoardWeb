const mongoose = require("mongoose");

const taskBoardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      default: [],
    },
  ],
});

module.exports = mongoose.model("TaskBoard", taskBoardSchema);
