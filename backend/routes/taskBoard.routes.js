const express = require("express");

const router = express.Router();

const taskBoardController = require("../controllers/taskBoard.controller");

router.get("/", taskBoardController.getAllTaskBoards);

router.post("/", taskBoardController.createTaskBoard);

router.get("/:id", taskBoardController.getTaskBoardById);

router.get("/:id/tasks", taskBoardController.getTasksByTaskBoardId);

router.put("/:id", taskBoardController.updateTaskBoard);

router.delete("/:id", taskBoardController.deleteTaskBoard);

module.exports = router;
