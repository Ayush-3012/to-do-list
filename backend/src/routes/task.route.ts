import { Router } from "express";
import { createTaskController, getTasksController, getTaskByIdController, updateTaskByIdController, deleteTaskByIdController, searchTaskController, getWeeklyTaskSummaryController } from "../controllers/task.controller.js";

const taskRouter = Router();

taskRouter.route("/").post(createTaskController).get(getTasksController);

taskRouter.route("/search").get(searchTaskController)

taskRouter.route("/weekly-summary").get(getWeeklyTaskSummaryController);

taskRouter.route("/:id").get(getTaskByIdController).patch(updateTaskByIdController).delete(deleteTaskByIdController)

export default taskRouter;