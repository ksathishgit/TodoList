const sinon = require("sinon");
const { expect } = require("chai");
const taskService = require("../../services/taskService");
const Task = require("../../models/Task");

describe("Task Service", () => {
  afterEach(() => sinon.restore());
  it("creates a task successfully", async () => {
    const req = {
      body: {
        taskName: "New Task",
        description: "Desc",
        startDate: "2024-01-01",
        endDate: "2024-01-02",
        effort: 5,
        status: "PENDING",
      },
    };
    sinon.stub(Task, "findOne").resolves(null);
    sinon.stub(Task.prototype, "save").resolves(req.body);
    const result = await taskService.createTask(req);
    expect(result.taskName).to.equal("New Task");
  });

  it("throws error if task already exists", async () => {
    sinon.stub(Task, "findOne").resolves({ taskName: "Existing Task" });
    try {
      await taskService.createTask({ body: { taskName: "Existing Task" } });
      throw new Error("Test failed");
    } catch (err) {
      expect(err.message).to.equal("Task already exists");
    }
  });

  it("throws error if status is missing", async () => {
    sinon.stub(Task, "findOne").resolves(null);
    try {
      await taskService.createTask({ body: { taskName: "Task" } });
      throw new Error("Test failed");
    } catch (err) {
      expect(err.message).to.equal("Task status is required");
    }
  });
  it("fetches tasks with pagination and default sorting", async () => {
    sinon.stub(Task, "aggregate").resolves([{ taskName: "Task1" }]);
    sinon.stub(Task, "countDocuments").resolves(1);
    const result = await taskService.fetchAllTasks({});
    expect(result.data).to.have.length(1);
    expect(result.pagination.totalRecords).to.equal(1);
  });
  it("deletes task successfully", async () => {
    sinon.stub(Task, "findById").resolves({ _id: "123" });
    sinon.stub(Task, "findByIdAndDelete").resolves(true);

    const result = await taskService.deleteTask({ params: { id: "123" } });
    expect(result).to.equal(true);
  });
  it("throws error if task not found while deleting", async () => {
    sinon.stub(Task, "findById").resolves(null);
    try {
      await taskService.deleteTask({ params: { id: "123" } });
      throw new Error("Test failed");
    } catch (err) {
      expect(err.message).to.equal("Task not found");
    }
  });
  it("updates task successfully", async () => {
    const task = {
      status: "PENDING",
      save: sinon.stub().resolves({ taskName: "Updated Task" }),
    };
    sinon.stub(Task, "findById").resolves(task);
    const req = {
      params: { taskId: "123" },
      body: {
        description: "Updated",
        startDate: "2024-01-02",
        endDate: "2024-01-03",
        effort: 8,
        status: "PENDING",
      },
    };
    const result = await taskService.updateTaskById(req);
    expect(result.taskName).to.equal("Updated Task");
  });

  it("throws error if updating completed task", async () => {
    sinon.stub(Task, "findById").resolves({ status: "COMPLETED" });
    try {
      await taskService.updateTaskById({ params: { taskId: "123" }, body: {} });
      throw new Error("Test failed");
    } catch (err) {
      expect(err.message).to.equal("Completed tasks cannot be edited");
    }
  });
  it("fetches task by name", async () => {
    sinon.stub(Task, "findOne").resolves({ taskName: "Task1" });
    const result = await taskService.fetchTaskByName({
      params: { taskName: "Task1" },
    });
    expect(result.taskName).to.equal("Task1");
  });

  it("throws error if task name not found", async () => {
    sinon.stub(Task, "findOne").resolves(null);
    try {
      await taskService.fetchTaskByName({ params: { taskName: "X" } });
      throw new Error("Test failed");
    } catch (err) {
      expect(err.message).to.equal("Task not found");
    }
  });
  it("updates task status by name", async () => {
    const task = {
      status: "PENDING",
      save: sinon.stub().resolves({ status: "COMPLETED" }),
    };
    sinon.stub(Task, "findOne").resolves(task);
    const result = await taskService.updateTaskStatusByName({
      params: { taskStatus: "COMPLETED" },
      query: { taskName: "Task1" },
    });
    expect(result.status).to.equal("COMPLETED");
  });

  it("throws error if status is invalid", async () => {
    try {
      await taskService.updateTaskStatusByName({
        params: { taskStatus: "INVALID" },
        query: { taskName: "Task1" },
      });
      throw new Error("Test failed");
    } catch (err) {
      expect(err.message).to.equal("Task status is invalid");
    }
  });
});
