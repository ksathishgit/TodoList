const express = require("express"),
  helmet = require("helmet"),
  rateLimit = require("express-rate-limit"),
  swaggerUi = require("swagger-ui-express"),
  yaml = require("yamljs");

const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
      message: "Too many requests. Please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

const swaggerDocument = yaml.load("../../docs/openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/todolist/api/v1/user", require("./routes/taskRoutes"));
module.exports = app;
