import mongoose from "mongoose"
import type { ITask } from "../types/task.types.js"

const taskSchema = new mongoose.Schema<ITask>({
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress",
    },
}, {
    timestamps: true
})

const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;