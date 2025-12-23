const app = require("../../index");
const request = require("supertest");
const Task = require("../../models/Task");

describe("Task API Routes", () => {
  afterEach(() => sinon.restore());
  it("POST /add-list → 201", async () => {
    const res = await request(app).post("/todolist/api/v1/user/add-list").send({
      taskName: "Test Task",
      description: "Test description",
      startDate: "2024-01-01",
      endDate: "2024-01-02",
      status: "PENDING",
      effort: 5,
    });
    res.status.should.equal(201);
    res.body.should.have.property("taskName", "Test Task");
  });

  it("GET /list/all", async () => {
    sinon.stub(Task, "find").returns({
      sort: () => ({ skip: () => ({ limit: () => [] }) }),
    });

    await request(app).get("/todolist/api/v1/user/list/all").expect(200);
  });
});
