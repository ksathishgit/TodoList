const taskService = require("../services/taskService");
exports.addTask = async (req, res) => taskService.createTask(req, res);
exports.listTask = async (req, res) => taskService.fetchAllTasks(req, res);
exports.deleteTaskById = async (req, res) => taskService.deleteTask(req, res);
exports.updateTaskById = async (req, res) =>
  taskService.updateTaskById(req, res);
exports.fetchTask = async (req, res) => taskService.fetchTaskByName(req, res);
exports.updateTaskStatusByName = async (req, res) =>
  taskService.updateTaskStatusByName(req, res);
