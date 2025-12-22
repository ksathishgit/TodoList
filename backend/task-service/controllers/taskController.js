const taskService = require("../services/taskService");

exports.addTask = async (req, res) => {
  try {
    const result = await taskService.createTask(req);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(error?.statusCode || 500).json({
      message: error.message || "Failed to add task",
    });
  }
};

exports.listTask = async (req, res) => {
  try {
    const result = await taskService.fetchAllTasks(req.query);
    return res.status(200).json(result.data);
  } catch (error) {
    return res.status(error?.statusCode || 500).json({
      message: error.message || "Failed to fetch task",
    });
  }
};

exports.deleteTaskById = async (req, res) => {
  try {
    await taskService.deleteTask(req);
    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(error?.statusCode || 500).json({
      message: error.message || "Failed to delete task",
    });
  }
};
exports.updateTaskById = async (req, res) => {
  try {
    const result = await taskService.updateTaskById(req);
    res.status(200).json(result);
  } catch (error) {
    return res.status(error?.statusCode || 500).json({
      message: error.message || "Failed to update task",
    });
  }
};
exports.fetchTask = async (req, res) => {
  try {
    const result = await taskService.fetchTaskByName(req);
    res.status(200).json(result);
  } catch (error) {
    return res.status(error?.statusCode || 500).json({
      message: error.message || "Failed to fetch task",
    });
  }
};
exports.updateTaskStatusByName = async (req, res) => {
  try {
    await taskService.updateTaskStatusByName(req);
    return res.status(200).json({
      message: "Task updated successfully",
    });
  } catch (error) {
    return res.status(error?.statusCode || 500).json({
      message: error.message || "Failed to update task",
    });
  }
};
