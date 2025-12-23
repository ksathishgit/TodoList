require("../setup/db");
const Task = require("../../models/Task");

describe("Task Model", () => {
  it("should save a valid task", async () => {
    const task = new Task({
      taskName: "Test",
      description: "Desc",
      startDate: new Date(),
      endDate: new Date(),
      status: "PENDING",
      effort: 5,
    });

    const saved = await task.save();
    expect(saved._id).to.exist;
  });

  it("should fail if effort <= 0", async () => {
    try {
      await Task.create({
        taskName: "Invalid",
        description: "Desc",
        startDate: new Date(),
        endDate: new Date(),
        status: "PENDING",
        effort: 0,
      });
    } catch (err) {
      expect(err).to.exist;
    }
  });
});
