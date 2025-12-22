// const sinon = require("sinon");
// const { expect } = require("chai");
// const Task = require("../../models/Task");
// const taskService = require("../../services/taskService");

// describe("Task Service", () => {
//   afterEach(() => sinon.restore());

//   it("creates a task", async () => {
//     const taskData = {
//       taskName: "Service Task",
//       description: "desc",
//       startDate: "2026-01-01",
//       endDate: "2026-01-01",
//       status: "PENDING",
//       effort: 2,
//     };
//     sinon.stub(Task.prototype, "save").resolves(taskData);
//     const result = await taskService.createTask(taskData);
//     expect(result.taskName).to.equal("Service Task");
//   });

//   it("does not delete completed task", async () => {
//     sinon.stub(Task, "findById").resolves({ status: "COMPLETED" });
//     try {
//       await taskService.deleteTaskById("123");
//       throw new Error("Should not delete");
//     } catch (err) {
//       expect(err.message).to.equal("Completed tasks cannot be deleted");
//     }
//   });
// });
