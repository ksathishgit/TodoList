import { TaskFormType, TaskField } from "../types/tasks";
export const VIEW_MODE = {
  LIST: "LIST",
  ADD: "ADD",
} as const;

export const INITIAL_TASK_FORM: TaskFormType = {
  taskName: "",
  description: "",
  startDate: "",
  endDate: "",
  status: "",
  effort: 0,
};

export const INITIAL_FORM_ERRORS: Record<TaskField, boolean> = {
  taskName: false,
  description: false,
  startDate: false,
  endDate: false,
  status: false,
  effort: false,
};
