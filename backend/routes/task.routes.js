const express = require("express");

const router = express.Router();

const taskController = require("../controllers/task.controller");

router.get("/", taskController.getAllTasks);

router.get("/:id", taskController.getTaskById);

router.post("/", taskController.createTask);

router.put("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

router.get("/task-board/:id", taskController.getTaskBoardByTaskId);

module.exports = router;