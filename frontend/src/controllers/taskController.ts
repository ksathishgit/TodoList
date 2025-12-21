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

export const updateTaskByName = (
  taskName: string,
  updatePayload: TaskFormType
) => {
  return axiosClient.put<Task>(`/update/${taskName}`, updatePayload);
};

export const deleteTaskById = (taskId: string) => {
  return axiosClient.delete<void>(`/delete/${taskId}`);
};

export const fetchTaskByName = (taskName: string) => {
  return axiosClient.get<Task>(`/list/${taskName}`);
};
