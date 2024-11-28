const mongoose = require("mongoose");

const taskBoardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "My Task Board",
  },
  description: {
    type: String,
    default: "Tasks to keep organised",
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
