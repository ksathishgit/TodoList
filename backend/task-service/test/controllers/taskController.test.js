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
});
