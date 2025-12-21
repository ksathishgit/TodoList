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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditTask from "./EditTask";
import { Task } from "../types/tasks";
import "../styles/form.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTaskById } from "../controllers/taskController";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface Props {
  tasks: Task[];
  loading: boolean;
  onEditTask: (task: Task) => void;
  onViewTask: (taskName: string) => void;
}

export default function TaskList({
  tasks,
  loading,
  onEditTask,
  onViewTask,
}: Props) {
  const [editTask, setEditTask] = useState<Task | null>(null);

  const handleDelete = async (taskId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      await deleteTaskById(taskId);
      toast.success("Task deleted successfully");
    } catch {
      toast.error("Failed to delete task");
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
              <TableCell>Status</TableCell>
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
                  <TableCell>{task.status}</TableCell>
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
                          onClick={() => onEditTask(task)}
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
                          onClick={() => handleDelete(task._id!)}
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
          taskName={editTask.taskName!}
          task={editTask}
          onUpdated={() => {
            setEditTask(null);
          }}
          onCancel={() => setEditTask(null)}
        />
      )}
    </Paper>
  );
}
