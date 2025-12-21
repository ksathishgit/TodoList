import { TaskFormType } from "../types/tasks";

export const isEndDateBeforeStartDate = (
  startDate?: string,
  endDate?: string
): boolean => {
  if (!startDate || !endDate) return false;
  return new Date(endDate) < new Date(startDate);
};

export const validateTaskForm = (
  form: TaskFormType,
  options?: { isEdit?: boolean }
) => {
  return {
    taskName: options?.isEdit ? false : !form.taskName,
    description: !form.description,
    startDate: !form.startDate,
    endDate:
      !form.endDate || isEndDateBeforeStartDate(form.startDate, form.endDate),
    status: !form.status,
    effort: !form.effort || form.effort <= 0,
  };
};

export const hasErrors = (errors: Record<string, boolean>) =>
  Object.values(errors).some(Boolean);
