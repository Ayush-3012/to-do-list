import express, {urlencoded} from "express";
import cors from "cors";

const app = express();

const allowedOrigins = ["http://localhost:5173"]

app.use(cors({
    origin: (origin, callback) => {
        if(!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));

import taskRouter from "./routes/task.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

app.use("/api/tasks", taskRouter);

app.use(errorMiddleware);

export default app;