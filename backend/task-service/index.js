const app = require("./server");
const connectDB = require("./db");
require("dotenv").config();
const PORT = process.env.PORT || 5001;
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
