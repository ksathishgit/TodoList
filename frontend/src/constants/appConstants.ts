import { TaskFormType } from "../types/tasks";
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
