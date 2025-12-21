const express = require("express");
const axios = require("axios");
const CircuitBreaker = require("opossum");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Vite frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

const callTaskService = () =>
  axios.create({ baseURL: "http://localhost:5001" });

const breaker = new CircuitBreaker(callTaskService, { timeout: 3000 });
app.use("/todolist/api/v1/user", async (req, res) => {
  try {
    const client = await breaker.fire();
    const response = await client({
      method: req.method,
      url: req.originalUrl,
      data: req.body,
    });
    res.json(response.data);
  } catch (err) {
    res.status(err?.status || 503).send({
      code: err?.code || "503",
      message: err?.message || "Unknown failure",
    });
  }
});

app.listen(5000, () => console.log("API Gateway running on port 5000"));
