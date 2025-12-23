const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongo;

before(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

after(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

module.exports = async function connectDB() {
  if (process.env.NODE_ENV === "test") return;
  await mongoose.connect(process.env.MONGO_URI);
};
