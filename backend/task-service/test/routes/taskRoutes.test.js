const request = require("supertest");
const sinon = require("sinon");
const app = require("../../server");
const taskController = require("../../controllers/taskController");
const taskService = require("../../services/taskService");
const { expect } = require("chai");

describe("Task API Routes", () => {
  afterEach(() => sinon.restore());

  // it("POST /add-list", async () => {
  //   sinon.stub(taskService, "createTask").resolves({});
  //   const res = await request(app).post("/todolist/api/v1/user/add-list").send({
  //     taskName: "Route Task",
  //     description: "desc",
  //     startDate: "2026-01-01",
  //     endDate: "2026-01-01",
  //     status: "PENDING",
  //     effort: 3,
  //   });
  //   expect(res.status).to.equal(201);
  // });

  it("GET /list/all", async () => {
    const mockTasks = [
      { taskName: "Task 1", effort: 2 },
      { taskName: "Task 2", effort: 3 },
    ];

    // sinon.stub(taskController, "listTask").callsFake((req, res) => {
    //   return res.status(200).json(mockTasks);
    // });

    await sinon.stub(taskService, "fetchAllTasks").resolves(mockTasks);

    const res = await request(app)
      .get("/todolist/api/v1/user/list/all")
      .expect(200);

    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(2);
  });

  // it("PUT /update/:taskStatus", async () => {
  //   sinon.stub(taskService, "updateTaskStatusByName").resolves({});
  //   const res = await request(app)
  //     .put("/todolist/api/v1/user/update/COMPLETED")
  //     .query({ taskName: "Route Task" });
  //   expect(res.status).to.equal(200);
  // });
});
