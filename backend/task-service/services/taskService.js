const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const taskPayload = req.body;
    const existingTask = await Task.findOne({
      taskName: taskPayload.taskName,
    });
    if (existingTask) {
      return res.status(400).json({
        message: "Task already exists",
      });
    }
    if (!taskPayload.status) {
      return res.status(400).json({
        message: "Task status is required",
      });
    }
    const newTask = new Task({
      taskName: taskPayload.taskName,
      description: taskPayload.description,
      startDate: taskPayload.startDate,
      endDate: taskPayload.endDate,
      status: taskPayload.status,
      effort: taskPayload.effort,
    });
    const savedTask = await newTask.save();
    return res.status(201).json(savedTask);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create task",
      error: error.message,
    });
  }
};

exports.fetchAllTasks = async (req, res) => {
  try {
    const tasks = await Task.aggregate([
      {
        $addFields: {
          statusPriority: {
            $cond: [{ $eq: ["$status", "PENDING"] }, 0, 1],
          },
        },
      },
      {
        $sort: {
          statusPriority: 1,
          effort: -1,
        },
      },
      {
        $project: {
          statusPriority: 0,
        },
      },
    ]);

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const existingTask = await Task.findById(taskId);
    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    await Task.findByIdAndDelete(taskId);
    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete task",
      error: error.message,
    });
  }
};

exports.updateTaskById = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const updatePayload = req.body;
    const existingTask = await Task.findById(taskId);
    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    if (existingTask.status === "COMPLETED") {
      return res.status(400).json({
        message: "Completed tasks cannot be edited",
      });
    }
    existingTask.description = updatePayload.description;
    existingTask.startDate = updatePayload.startDate;
    existingTask.endDate = updatePayload.endDate;
    existingTask.effort = updatePayload.effort;
    if (updatePayload.status) {
      existingTask.status = updatePayload.status;
    }
    const updatedTask = await existingTask.save();
    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update task",
      error: error.message,
    });
  }
};

exports.fetchTaskByName = async (req, res) => {
  try {
    const taskName = req.params.taskName;
    const task = await Task.findOne({ taskName });
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch task",
      error: error.message,
    });
  }
};

exports.updateTaskStatusByName = async (req, res) => {
  try {
    const taskStatus = req.params.taskStatus;
    const taskName = req.query.taskName;

    if (!taskName) {
      return res.status(400).json({
        message: "taskName query parameter is required",
      });
    }

    if (!["PENDING", "COMPLETED"].includes(taskStatus)) {
      return res.status(400).json({
        message: "Invalid task status",
      });
    }

    const existingTask = await Task.findOne({ taskName });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (existingTask.status === taskStatus) {
      return res.status(400).json({
        message: "Task already has the same status",
      });
    }
    existingTask.status = taskStatus;
    const updatedTask = await existingTask.save();
    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update task status",
      error: error.message,
    });
  }
};
