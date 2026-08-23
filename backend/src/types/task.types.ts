type Priority = "low" | "medium" | "high";
type Status = "in-progress" | "completed";

export interface ITask {
    title: string;
    description?: string;
    dateTime: Date;
    priority?: Priority;
    status: Status;
}