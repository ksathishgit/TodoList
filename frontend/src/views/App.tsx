import React, { useCallback, useEffect, useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import EditTask from "./EditTask";
import { fetchAllTasks } from "../controllers/taskController";
import { toast } from "react-toastify";
import { Task } from "../types/tasks";
import "../styles/form.css";
import ViewTask from "./ViewTask";

type ViewMode = "LIST" | "ADD" | "EDIT" | "VIEW";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("LIST");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewTaskName, setViewTaskName] = useState<string | null>(null);

  const handleViewTask = (taskName: string) => {
    setViewTaskName(taskName);
    setViewMode("VIEW");
  };

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchAllTasks();
      setTasks(res.data);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddClick = () => {
    setViewMode(viewMode === "LIST" ? "ADD" : "LIST");
    setSelectedTask(null);
  };

  const handleEditClick = (taskId: string, task: Task) => {
    setSelectedTask(task);
    setViewMode("EDIT");
  };

  const handleBackToList = () => {
    setViewMode("LIST");
    setSelectedTask(null);
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2>Todo List</h2>

        {viewMode !== "EDIT" && (
          <button className="todo-primary-btn" onClick={handleAddClick}>
            {viewMode === "LIST" ? "Add Task" : "Back"}
          </button>
        )}
      </div>
      {viewMode === "LIST" && (
        <TaskList
          tasks={tasks}
          loading={loading}
          onEditTask={handleEditClick}
          onViewTask={handleViewTask}
          onTaskUpdated={fetchTasks}
        />
      )}

      {viewMode === "VIEW" && viewTaskName && (
        <ViewTask taskName={viewTaskName} onBack={handleBackToList} />
      )}

      {viewMode === "ADD" && (
        <AddTask
          onTaskAdded={() => {
            fetchTasks();
            handleBackToList();
          }}
        />
      )}

      {viewMode === "EDIT" && selectedTask && (
        <EditTask
          taskId={selectedTask._id!}
          task={selectedTask}
          onUpdated={() => {
            fetchTasks();
            handleBackToList();
          }}
          onCancel={handleBackToList}
        />
      )}
    </div>
  );
}
