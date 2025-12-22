const { describe, before, after, afterEach } = require("mocha");
const db = require("./mongoTestDb");

describe("Global Test Setup", function () {
  this.timeout(10000);

  before(async () => {
    await db.connect();
  });

  afterEach(async () => {
    await db.clear();
  });

  after(async () => {
    await db.close();
  });
});
