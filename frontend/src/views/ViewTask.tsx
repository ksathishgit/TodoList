import React, { useEffect, useState } from "react";
import { fetchTaskByName } from "../controllers/taskController";
import TaskForm from "../components/TaskForm";
import { TaskFormType } from "../types/tasks";
import { toast } from "react-toastify";

interface Props {
  taskName: string;
  onBack: () => void;
}

export default function ViewTask({ taskName, onBack }: Props) {
  const [form, setForm] = useState<TaskFormType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadTask = async () => {
      try {
        setLoading(true);
        const res = await fetchTaskByName(taskName);
        const task = res.data;
        setForm({
          taskName: task.taskName,
          description: task.description,
          startDate: task.startDate,
          endDate: task.endDate,
          status: task.status,
          effort: task.effort,
        });
      } catch {
        toast.error("Failed to load task");
        onBack();
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [taskName, onBack]);

  if (!form) return null;

  return (
    <TaskForm
      title="View Task"
      form={form}
      mode="VIEW"
      loading={loading}
      onCancel={onBack}
    />
  );
}
