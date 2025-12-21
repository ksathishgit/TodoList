import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";
import TaskForm from "../components/TaskForm";
import { updateTaskByName } from "../controllers/taskController";
import {
  validateTaskForm,
  hasErrors,
  isEndDateBeforeStartDate,
} from "../utils/taskValidation";
import { Task, TaskFormType } from "../types/tasks";
import { TOAST_MESSAGES } from "../constants/messages";

interface Props {
  taskName: string;
  task: Task;
  onUpdated: () => void;
  onCancel: () => void;
}

export default function EditTask({
  taskName,
  task,
  onUpdated,
  onCancel,
}: Props) {
  const [form, setForm] = useState<TaskFormType>({
    taskName: task.taskName,
    description: task.description,
    startDate: task.startDate,
    endDate: task.endDate,
    status: task.status,
    effort: task.effort,
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = useCallback(
    (field: string, value: any) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const updated = { ...form, [field]: value };
      setForm(updated);
      if (isSubmitted) {
        setErrors((prev) => ({
          ...prev,
          [field]: validateTaskForm(updated, { isEdit: true })[field],
        }));
      }
    },
    [form, isSubmitted]
  );

  const handleSubmit = useCallback(async () => {
    setIsSubmitted(true);
    const validationErrors = validateTaskForm(form, { isEdit: true });
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      toast.error(
        isEndDateBeforeStartDate(form.startDate, form.endDate)
          ? TOAST_MESSAGES.DATE_INVALID
          : TOAST_MESSAGES.VALIDATION_GENERIC
      );
      return;
    }

    try {
      setLoading(true);
      await updateTaskByName(taskName, form);
      toast.success("Task updated successfully");
      onUpdated();
    } catch {
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  }, [form, onUpdated]);

  return (
    <TaskForm
      title="Edit Task"
      form={form}
      errors={Object.fromEntries(
        Object.entries(errors).map(([key, value]) => [
          key,
          Boolean(value && (touched[key] || isSubmitted)),
        ])
      )}
      mode="EDIT"
      loading={loading}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}
