const e = require("express"),
  m = require("mongoose"),
  h = require("helmet"),
  rl = require("express-rate-limit"),
  sw = require("swagger-ui-express"),
  Y = require("yamljs");
const cors = require("cors");
const app = e();
app.use(cors());
app.use(e.json());
app.use(h());
app.use(rl({ windowMs: 6e4, max: 100 }));
m.connect(
  "mongodb+srv://todo-list-user:Admin@cluster0.q1kho3j.mongodb.net/?appName=Cluster0"
);
console.log("Database conneccted");
const doc = Y.parse("openapi:3.0.0\\ninfo:{title:Task API,version:1.0.0}");
app.use("/swagger", sw.serve, sw.setup(doc));
app.use("/todolist/api/v1/user", require("./routes/taskRoutes"));
app.listen(5001);
