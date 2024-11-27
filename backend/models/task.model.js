const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
    enum: ["🧑‍💻", "💬", "☕", "🏋️‍♂️", "⏰", "📚"],
  },
  status: {
    type: String,
    //actually these are completed, in-progress, and would not do just for the sake of simplicity i have used these
    enum: ["wont", "in-progress", "done", "other"],
  },
  taskBoard: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TaskBoard",
  },
});

module.exports = mongoose.model("Task", taskSchema);
