const router = require("express").Router(),
  taskController = require("../controllers/taskController");
router.post("/add-list", taskController.addTask);
router.get("/list/all", taskController.listTask);
router.delete("/delete/:id", taskController.deleteTaskById);
router.put("/update/:taskName", taskController.updateTask);
router.get("/list/:taskName", taskController.fetchTask);
module.exports = router;
