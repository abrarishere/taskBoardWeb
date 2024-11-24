const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
    enum: ["🧑‍💻", "💬", "☕", "🏋️‍♂️", "⏰", "📚"]
  },
  status: {
    type: String,
    required: true,
    //actually these are completed, in-progress, and would not do just for the sake of simplicity i have used these
    enum: ["wont", "in-progress", "done"],
  },
  taskBoard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TaskBoard",
  },
});

module.exports = mongoose.model("Task", taskSchema);
