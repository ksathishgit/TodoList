const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Task = require("../../models/Task");
const { expect } = require("chai");
let mongo;
describe("Task Model", () => {
  before(async function () {
    this.timeout(10000);
    mongo = await MongoMemoryServer.create();
    await mongoose.connect(mongo.getUri());
  });

  afterEach(async () => {
    await Task.deleteMany({});
  });

  after(async () => {
    await mongoose.disconnect();
    await mongo.stop();
  });

  it("should save a valid task", async () => {
    const task = new Task({
      taskName: "Model Test",
      description: "desc",
      startDate: "2026-01-01",
      endDate: "2026-01-01",
      status: "PENDING",
      effort: 2,
    });

    const saved = await task.save();
    expect(saved).to.have.property("_id");
  });

  it("should fail if effort <= 0", async () => {
    const task = new Task({
      taskName: "Invalid",
      description: "desc",
      startDate: "2026-01-01",
      endDate: "2026-01-01",
      status: "PENDING",
      effort: 0,
    });

    try {
      await task.save();
      throw new Error("Should not save");
    } catch (err) {
      expect(err).to.exist;
    }
  });
});
