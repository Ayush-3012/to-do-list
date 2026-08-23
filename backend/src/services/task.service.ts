import Task from "../models/task.model.js";
import type { ITask } from "../types/task.types.js";

export const createTask = async (data: ITask) => {
  return await Task.create(data);
};

export const getTasks = async () => {
  return await Task.find({});
};

export const getTaskById = async (id: string) => {
  return await Task.findById(id);
};

export const updateTaskById = async (id: string, data: Partial<ITask>) => {
  return await Task.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteTaskById = async (id: string) => {
  return await Task.findByIdAndDelete(id);
};

export const searchTasks = async (keyword: string) => {
  return await Task.find({
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ],
  });
};

export const getWeeklyTaskSummary = async () => {
  return await Task.aggregate([
    {
      $set: {
        weekStart: {
          $dateTrunc: {
            date: "$dateTime",
            unit: "week",
            startOfWeek: "monday",
          },
        },
      },
    },
    {
      $group: {
        _id: "$weekStart",
        openTasks: {
          $sum: {
            $cond: [{ $eq: ["$status", "in-progress"] }, 1, 0],
          },
        },
        completedTasks: {
          $sum: {
            $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
          },
        },
        tasks: {
          $push: "$$ROOT",
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
};