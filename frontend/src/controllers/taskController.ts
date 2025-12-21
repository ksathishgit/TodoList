import axiosClient from "../api/axiosClient";
import { Task, TaskFormType } from "../types/tasks";

export interface FetchTasksParams {
  sortBy?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export const fetchAllTasks = (queryParams?: FetchTasksParams) => {
  return axiosClient.get<Task[]>("/list/all", {
    params: queryParams,
  });
};

export const createTask = (taskPayload: TaskFormType) => {
  return axiosClient.post<Task>("/add-list", taskPayload);
};

export const updateTaskStatusByName = (
  taskName: string,
  status: "PENDING" | "COMPLETED"
) => {
  return axiosClient.put(`/update/${status}?taskName=${taskName}`, {});
};

export const deleteTaskById = (taskId: string) => {
  return axiosClient.delete<void>(`/delete/${taskId}`);
};

export const fetchTaskByName = (taskName: string) => {
  return axiosClient.get<Task>(`/list/${taskName}`);
};

export const updateTaskById = (taskId: string, updatePayload: TaskFormType) => {
  return axiosClient.put<Task>(`/update/task/${taskId}`, updatePayload);
};
