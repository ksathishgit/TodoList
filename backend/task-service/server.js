const app = require("./index");
const connectDB = require("./db");
require("dotenv").config();
const PORT = process.env.PORT || 5001;
connectDB();
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port  ${PORT}`));
}
