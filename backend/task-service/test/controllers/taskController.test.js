const controller = require("../../controllers/taskController");
const service = require("../../services/taskService");

describe("Task Controller", () => {
  afterEach(() => sinon.restore());
  it("addTask → 201", async () => {
    const req = { body: { taskName: "Test" } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(service, "createTask").resolves(req.body);
    await controller.addTask(req, res);
    expect(res.status).to.have.been.calledWith(201);
  });
  it("addTask → 400", async () => {
    const req = { body: { taskName: "Test" } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(service, "createTask").rejects({
      statusCode: 400,
      message: "Failed to add Task",
    });
    await controller.addTask(req, res);
    expect(res.status).to.have.been.calledWith(400);
  });

  it("listTask -> 200", async () => {
    const req = { query: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(service, "fetchAllTasks").resolves({
      data: [
        {
          taskName: "Test Task2",
          description: "Desc",
          effort: 5,
          status: "PENDING",
        },
      ],
      pagination: {},
    });
    await controller.listTask(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });
  it("listTask -> 500", async () => {
    const req = { query: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(service, "fetchAllTasks").rejects({
      statusCode: 500,
      message: "Failed to fetch tasks",
    });
    await controller.listTask(req, res);
    expect(res.status).to.have.been.calledWith(500);
  });

  it("deleteTask -> 200", async () => {
    const req = { params: { id: "Test" } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(service, "deleteTask").resolves(req);
    await controller.deleteTaskById(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });

  it("deleteTask -> 400", async () => {
    const req = { params: { id: "Test" } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(service, "deleteTask").rejects({
      statusCode: 400,
      message: "Task not found",
    });
    await controller.deleteTaskById(req, res);
    expect(res.status).to.have.been.calledWith(400);
  });

  it("updateTask -> 200", async () => {
    const req = { params: { taskId: "123" }, body: { taskName: "Test" } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(service, "updateTaskById").resolves(res);
    await controller.updateTaskById(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });
  it("updateTask -> 400", async () => {
    const req = { params: { taskId: "123" }, body: { taskName: "Test" } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(service, "updateTaskById").rejects({
      statusCode: 400,
      message: "Task not found",
    });
    await controller.updateTaskById(req, res);
    expect(res.status).to.have.been.calledWith(400);
  });
  it("fetchTask -> 200", async () => {
    const req = { params: { taskName: "Test" } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(service, "fetchTaskByName").resolves(res);
    await controller.fetchTask(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });
  it("fetchTask -> 400", async () => {
    const req = { params: { taskName: "Test" } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(service, "fetchTaskByName").rejects({
      statusCode: 400,
      message: "Task not found",
    });
    await controller.fetchTask(req, res);
    expect(res.status).to.have.been.calledWith(400);
  });
  it("updateStatus -> 200", async () => {
    const req = { params: { taskName: "Test", taskStatus: "COMPLETED" } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(service, "updateTaskStatusByName").resolves(res);
    await controller.updateTaskStatusByName(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });
  it("updateStatus -> 400", async () => {
    const req = { params: { taskName: "Test", taskStatus: "COMPLETED" } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    sinon.stub(service, "updateTaskStatusByName").rejects({
      statusCode: 400,
      message: "Task not found",
    });
    await controller.updateTaskStatusByName(req, res);
    expect(res.status).to.have.been.calledWith(400);
  });
});
