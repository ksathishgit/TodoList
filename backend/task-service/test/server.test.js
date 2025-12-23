describe("Server bootstrap", () => {
  it("should load server without starting listener", () => {
    process.env.NODE_ENV = "test";
    require("../server");
  });
});
