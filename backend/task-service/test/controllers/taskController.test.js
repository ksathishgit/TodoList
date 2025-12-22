// const sinon = require("sinon");
// const { expect } = require("chai");

// const taskController = require("../../controllers/taskController");
// const taskService = require("../../services/taskService");

// describe("Task Controller", () => {
//   afterEach(() => sinon.restore());
//   it("addTask → 201", async () => {
//     const req = {
//       body: {
//         taskName: "Test Task",
//         description: "desc",
//         startDate: "2026-01-01",
//         endDate: "2026-01-01",
//         status: "PENDING",
//         effort: 2,
//       },
//     };
//     const res = {
//       status: sinon.stub().returnsThis(),
//       json: sinon.stub(),
//     };
//     sinon.stub(taskService, "createTask").resolves({
//       taskName: "Test Task",
//     });
//     await taskController.addTask(req, res);
//     expect(res.status.calledOnce).to.be.true;
//     expect(res.status.firstCall.args[0]).to.equal(201);
//     expect(res.json.calledOnce).to.be.true;
//   });
// });
