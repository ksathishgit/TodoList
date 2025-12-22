const Task = require("../models/Task");

exports.createTask = async (req) => {
  const taskPayload = req.body;
  const existingTask = await Task.findOne({
    taskName: taskPayload.taskName,
  });
  if (existingTask) {
    throw {
      statusCode: 400,
      message: "Task already exists",
    };
  }
  if (!taskPayload.status) {
    throw {
      statusCode: 400,
      message: "Task status is required",
    };
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
  return savedTask;
};

exports.fetchAllTasks = async (queryParams) => {
  const {
    status,
    minEffort,
    maxEffort,
    sortBy = "effort",
    sortOrder = "desc",
    page = 1,
    limit = 10,
  } = queryParams;

  const filter = {};
  if (status) {
    filter.status = status;
  }
  if (minEffort || maxEffort) {
    filter.effort = {};
    if (minEffort) filter.effort.$gte = Number(minEffort);
    if (maxEffort) filter.effort.$lte = Number(maxEffort);
  }
  const sort = {};
  sort[sortBy] = sortOrder === "asc" ? 1 : -1;
  const skip = (Number(page) - 1) * Number(limit);
  const [tasks, total] = await Promise.all([
    Task.find(filter).sort(sort).skip(skip).limit(Number(limit)),
    Task.countDocuments(filter),
  ]);

  return {
    data: tasks,
    pagination: {
      totalRecords: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      pageSize: Number(limit),
    },
  };
};

exports.deleteTask = async (req) => {
  const taskId = req.params.id;
  const existingTask = await Task.findById(taskId);
  if (!existingTask) {
    throw {
      statusCode: 400,
      message: "Task not found",
    };
  }
  await Task.findByIdAndDelete(taskId);
  return true;
};

exports.updateTaskById = async (req) => {
  const taskId = req.params.taskId;
  const updatePayload = req.body;
  const existingTask = await Task.findById(taskId);
  if (!existingTask) {
    throw {
      statusCode: 400,
      message: "Task not found",
    };
  }
  if (existingTask.status === "COMPLETED") {
    throw {
      statusCode: 400,
      message: "Completed tasks cannot be edited",
    };
  }
  existingTask.description = updatePayload.description;
  existingTask.startDate = updatePayload.startDate;
  existingTask.endDate = updatePayload.endDate;
  existingTask.effort = updatePayload.effort;
  if (updatePayload.status) {
    existingTask.status = updatePayload.status;
  }
  const updatedTask = await existingTask.save();
  return updatedTask;
};

exports.fetchTaskByName = async (req) => {
  const taskName = req.params.taskName;
  const task = await Task.findOne({ taskName });
  if (!task) {
    throw {
      statusCode: 400,
      message: "Task not found",
    };
  }
  return task;
};

exports.updateTaskStatusByName = async (req) => {
  const taskStatus = req.params.taskStatus;
  const taskName = req.query.taskName;
  if (!taskName) {
    throw {
      statusCode: 400,
      message: "Task name is required",
    };
  }
  if (!["PENDING", "COMPLETED"].includes(taskStatus)) {
    throw {
      statusCode: 400,
      message: "Task status is invalid",
    };
  }
  const existingTask = await Task.findOne({ taskName });
  if (!existingTask) {
    throw {
      statusCode: 400,
      message: "Task not found",
    };
  }
  if (existingTask.status === taskStatus) {
    throw {
      statusCode: 400,
      message: "Task already has the same status",
    };
  }
  existingTask.status = taskStatus;
  const updatedTask = await existingTask.save();
  return updatedTask;
};
