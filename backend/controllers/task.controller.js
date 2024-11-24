const errorLogger = require("../utils/errorLogger"); // It is used to log the error to the console
const notFoundSolver = require("../utils/notFoundSolver"); // It is used to send a 404 response if the data is not found
const taskModel = require("../models/task.model");
const taskBoardModel = require("../models/taskBoard.model");
// It is used to get all the tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find();
    notFoundSolver(req, res, tasks);
    res.status(200).json(tasks);
  } catch (error) {
    errorLogger(error);
  }
};

// It is used to get a task by its ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    notFoundSolver(req, res, task);
    res.status(200).json(task);
  } catch (error) {
    errorLogger(error);
  }
};

// It is used to create a new task
exports.createTask = async (req, res) => {
  try {
    const task = new taskModel({
      title: req.body.title,
      description: req.body.description,
      icon: req.body.icon,
      status: req.body.status,
      taskBoard: req.body.taskBoard,
    });
    const taskBoard = await taskBoardModel.findById(req.body.taskBoard);
    notFoundSolver(req, res, taskBoard);
    taskBoard.tasks.push(task._id);
    await task.save();
    await taskBoard.save();
    res.status(201).json(task);
  } catch (error) {
    errorLogger(error);
  }
};

// It is used to update a task by its ID
exports.updateTask = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    notFoundSolver(req, res, task);
    task.title = req.body.title;
    task.description = req.body.description;
    task.icon = req.body.icon;
    task.status = req.body.status;
    task.taskBoard = req.body.taskBoard;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    errorLogger(error);
  }
};

// It is used to delete a task by its ID
exports.deleteTask = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    notFoundSolver(req, res, task);
    const taskBoard = await taskBoardModel.findById(task.taskBoard);
    notFoundSolver(req, res, taskBoard);
    taskBoard.tasks = taskBoard.tasks.filter(
      (task) => task.toString() !== req.params.id
    );
    await taskBoard.save();
    await task.deleteOne();
    res.status(200).json(task);
  } catch (error) {
    errorLogger(error);
  }
};

// It is used to get the task board by the task ID
exports.getTaskBoardByTaskId = async (req, res) => {
  try {
    const taskBoard = await taskBoardModel.findOne({
      tasks: { $in: [req.params.id] }, //$in is used to find the task board by the task ID
    });
    notFoundSolver(req, res, taskBoard);
    res.status(200).json(taskBoard);
  } catch (error) {
    errorLogger(error);
  }
};
