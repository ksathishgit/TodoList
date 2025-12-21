export type TaskStatus = "PENDING" | "COMPLETED";

export interface Task {
  _id: string;
  taskName: string;
  description: string;
  startDate: string;
  endDate: string;
  status: TaskStatus;
  effort: number;
}

export type TaskField =
  | "taskName"
  | "description"
  | "startDate"
  | "endDate"
  | "status"
  | "effort";

export interface TaskFormType {
  taskName: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "" | TaskStatus;
  effort: number;
}

export interface TaskFormErrors {
  taskName?: boolean;
  description?: boolean;
  startDate?: boolean;
  endDate?: boolean;
  status?: boolean;
  effort?: boolean;
}
