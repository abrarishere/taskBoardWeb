const errorLogger = require("../utils/errorLogger"); // It is used to log the error to the console
const notFoundSolver = require("../utils/notFoundSolver"); // It is used to send a 404 response if the data is not found
const taskBoardModel = require("../models/taskBoard.model");
const taskModel = require("../models/task.model");

// Get all task boards from the database and send them as a response
exports.getAllTaskBoards = async (req, res) => {
  try {
    const taskBoards = await taskBoardModel.find();
    notFoundSolver(req, res, taskBoards);
    res.send(taskBoards);
  } catch (error) {
    errorLogger(error, req, res);
  }
};

// Get a task board by its ID from the database and send it as a response
exports.getTaskBoardById = async (req, res) => {
  try {
    const taskBoard = await taskBoardModel.findById(req.params.id);
    notFoundSolver(req, res, taskBoard);
    res.send(taskBoard);
  } catch (error) {
    errorLogger(error, req, res);
  }
};

// Create a new task board in the database and send it as a response
exports.createTaskBoard = async (req, res) => {
  try {
    const taskBoard = new taskBoardModel({
      title: req.body.title,
    });
    await taskBoard.save();
    res.send(taskBoard);
  } catch (error) {
    errorLogger(error, req, res);
  }
};

// Update a task board by its ID in the database and send it as a response
exports.updateTaskBoard = async (req, res) => {
  try {
    const taskBoard = await taskBoardModel.findById(req.params.id);
    notFoundSolver(req, res, taskBoard);
    taskBoard.title = req.body.title;
    taskBoard.description = req.body.description;
    await taskBoard.save();
    res.send(taskBoard);
  } catch (error) {
    errorLogger(error, req, res);
  }
};

// Delete a task board by its ID from the database and send it as a response
exports.deleteTaskBoard = async (req, res) => {
  try {
    const taskBoard = await taskBoardModel.findById(req.params.id);
    
    // delete the task board
    notFoundSolver(req, res, taskBoard);
    // delete all tasks associated with the task board
    await taskModel.deleteMany({ taskBoard: req.params.id });
    await taskBoard.delete();
    res.send(taskBoard);
  } catch (error) {
    errorLogger(error, req, res);
  }
};

exports.getTasksByTaskBoardId = async (req, res) => {
  try {
    const taskBoard = await taskBoardModel
      .findById(req.params.id)
      .populate("tasks");
    notFoundSolver(req, res, taskBoard);
    res.send(taskBoard.tasks);
  } catch (error) {
    errorLogger(error, req, res);
  }
};