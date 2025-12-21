import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Typography,
  Tooltip,
  Link,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditTask from "./EditTask";
import { Task } from "../types/tasks";
import "../styles/form.css";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteTaskById,
  updateTaskStatusByName,
} from "../controllers/taskController";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ConfirmDialog from "../components/ConfirmationDialog";

interface Props {
  tasks: Task[];
  loading: boolean;
  onEditTask: (taskId: string, task: Task) => void;
  onViewTask: (taskName: string) => void;
  onTaskUpdated: () => void;
}

export default function TaskList({
  tasks,
  loading,
  onEditTask,
  onViewTask,
  onTaskUpdated,
}: Props) {
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [updatingTaskName, setUpdatingTaskName] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState<{
    title: string;
    description: string;
    onConfirm: () => void;
  } | null>(null);

  const [actionLoading, setActionLoading] = useState(false);

  const handleDeleteClick = (taskId: string) => {
    setConfirmConfig({
      title: "Delete Task",
      description: "Are you sure you want to delete this task?",
      onConfirm: () => confirmDelete(taskId),
    });
    setConfirmOpen(true);
  };

  const confirmDelete = async (taskId: string) => {
    try {
      setActionLoading(true);
      await deleteTaskById(taskId);
      toast.success("Task deleted successfully");
      onTaskUpdated();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete task");
    } finally {
      setActionLoading(false);
      setConfirmOpen(false);
    }
  };

  const handleStatusClick = (taskName: string, status: "COMPLETED") => {
    setConfirmConfig({
      title: "Update Task Status",
      description: `Are you sure you want to mark this task as ${status}?`,
      onConfirm: () => confirmStatusUpdate(taskName, status),
    });
    setConfirmOpen(true);
  };

  const confirmStatusUpdate = async (taskName: string, status: "COMPLETED") => {
    try {
      setActionLoading(true);
      setUpdatingTaskName(taskName);

      await updateTaskStatusByName(taskName, status);

      toast.success(`Task marked as ${status}`);
      onTaskUpdated();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    } finally {
      setActionLoading(false);
      setUpdatingTaskName(null);
      setConfirmOpen(false);
    }
  };

  return (
    <Paper className="todo-card">
      <Typography className="todo-section-title">Task List</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* Loading */}
            {loading && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}
            {!loading && tasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center" className="todo-no-data">
                  No results found
                </TableCell>
              </TableRow>
            )}
            {!loading &&
              tasks.length > 0 &&
              tasks.map((task) => (
                <TableRow key={task._id}>
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell align="center">
                    {task.status}
                    {task.status !== "COMPLETED" && (
                      <div className="todo-status-action">
                        {updatingTaskName === task.taskName ? (
                          <CircularProgress size={16} />
                        ) : (
                          <Link
                            component="button"
                            underline="hover"
                            className="todo-status-link"
                            onClick={() =>
                              handleStatusClick(task.taskName, "COMPLETED")
                            }
                          >
                            Mark as complete
                          </Link>
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View task">
                      <IconButton
                        color="info"
                        onClick={() => onViewTask(task.taskName)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={
                        task.status === "COMPLETED"
                          ? "Completed tasks cannot be edited"
                          : "Edit task"
                      }
                    >
                      <span>
                        <IconButton
                          color="primary"
                          disabled={task.status === "COMPLETED"}
                          onClick={() => onEditTask(task._id, task)}
                        >
                          <EditIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Tooltip title="Delete task">
                      <span>
                        <IconButton
                          color="error"
                          // disabled={task.status === "COMPLETED"}
                          onClick={() => handleDeleteClick(task._id!)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editTask && (
        <EditTask
          taskId={editTask._id}
          task={editTask}
          onUpdated={() => {
            setEditTask(null);
          }}
          onCancel={() => setEditTask(null)}
        />
      )}
      {confirmConfig && (
        <ConfirmDialog
          open={confirmOpen}
          title={confirmConfig.title}
          description={confirmConfig.description}
          loading={actionLoading}
          onConfirm={confirmConfig.onConfirm}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </Paper>
  );
}
