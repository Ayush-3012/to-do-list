import mongoose from "mongoose";
import type { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      success: false,
      message: "Invalid task ID",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};