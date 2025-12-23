const sinon = require("sinon");
const { expect } = require("chai");
const taskService = require("../../services/taskService");
const Task = require("../../models/Task");

describe("Task Service", () => {
  afterEach(() => sinon.restore());

  it("creates a task", async () => {
    const req = {
      body: {
        taskName: "Test Task2",
        description: "Desc",
        effort: 5,
        status: "PENDING",
      },
    };

    sinon.stub(Task, "create").resolves(req.body);

    const result = await taskService.createTask(req);

    expect(result).to.have.property("taskName", "Test Task2");
  });
});
