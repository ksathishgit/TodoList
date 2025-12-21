import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import TaskForm from "../components/TaskForm";
import { createTask } from "../controllers/taskController";
import { INITIAL_TASK_FORM } from "../constants/appConstants";
import { TOAST_MESSAGES } from "../constants/messages";
import {
  validateTaskForm,
  hasErrors,
  isEndDateBeforeStartDate,
} from "../utils/taskValidation";
import { TaskFormType } from "../types/tasks";

interface Props {
  onTaskAdded: () => void;
}

export default function AddTask({ onTaskAdded }: Props) {
  const [form, setForm] = useState<TaskFormType>(INITIAL_TASK_FORM);
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
        setErrors(validateTaskForm(updated));
      }
    },
    [form, isSubmitted]
  );

  const handleSubmit = async () => {
    setIsSubmitted(true);

    const validationErrors = validateTaskForm(form);
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
      await createTask(form);
      toast.success(TOAST_MESSAGES.ADD_SUCCESS);
      onTaskAdded();
      setForm(INITIAL_TASK_FORM);
    } catch {
      toast.error(TOAST_MESSAGES.ADD_FAILURE);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskForm
      title="Add Task"
      form={form}
      errors={Object.fromEntries(
        Object.entries(errors).map(([key, value]) => [
          key,
          Boolean(value && (touched[key] || isSubmitted)),
        ])
      )}
      mode="ADD"
      loading={loading}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
