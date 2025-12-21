const taskService = require("../services/taskService");
exports.addTask = async (req, res) => taskService.createTask(req, res);
exports.listTask = async (req, res) => taskService.fetchAllTasks(req, res);
exports.deleteTaskById = async (req, res) => taskService.deleteTask(req, res);
exports.updateTask = async (req, res) => taskService.updateTaskByName(req, res);
exports.fetchTask = async (req, res) => taskService.fetchTaskByName(req, res);
