import React, { memo, useMemo } from "react";
import {
  Paper,
  Typography,
  TextField,
  Input,
  Button,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "../styles/form.css";

interface Props {
  title: string;
  form: any;
  errors?: any;
  loading?: boolean;
  mode: "ADD" | "EDIT" | "VIEW";
  onChange?: (field: string, value: any) => void;
  onSubmit?: () => void;
  onCancel?: () => void;
}

function TaskForm({
  title,
  form,
  errors,
  loading,
  mode,
  onChange,
  onSubmit,
  onCancel,
}: Props) {
  const startDateValue = useMemo(
    () => (form.startDate ? dayjs(form.startDate) : null),
    [form.startDate]
  );

  const endDateValue = useMemo(
    () => (form.endDate ? dayjs(form.endDate) : null),
    [form.endDate]
  );

  const endMinDate = useMemo(
    () => (form.startDate ? dayjs(form.startDate) : undefined),
    [form.startDate]
  );

  const isReadOnly = mode === "VIEW";

  return (
    <Paper className="todo-card">
      <Typography className="todo-section-title">{title}</Typography>

      <div className="todo-form-grid">
        <TextField
          placeholder="Task Name*"
          value={form.taskName}
          disabled={mode !== "ADD"}
          error={errors?.taskName}
          onChange={(e) => onChange && onChange("taskName", e.target.value)}
        />

        <TextField
          placeholder="Description*"
          value={form.description}
          error={errors?.description}
          multiline
          rows={3}
          disabled={isReadOnly}
          onChange={(e) => onChange && onChange("description", e.target.value)}
        />

        <div className="todo-form-row-2">
          <DatePicker
            label="Start Date*"
            disablePast
            value={startDateValue}
            onChange={(date) =>
              onChange &&
              onChange("startDate", date ? date.format("YYYY-MM-DD") : "")
            }
            disabled={isReadOnly}
            slotProps={{
              textField: {
                error: errors?.startDate,
                fullWidth: true,
              },
            }}
          />

          <DatePicker
            label="End Date*"
            disablePast
            minDate={endMinDate}
            value={endDateValue}
            onChange={(date) =>
              onChange &&
              onChange("endDate", date ? date.format("YYYY-MM-DD") : "")
            }
            disabled={isReadOnly}
            slotProps={{
              textField: {
                error: errors?.endDate,
                fullWidth: true,
              },
            }}
          />
        </div>

        <TextField
          select
          label="Status*"
          value={form.status}
          error={errors?.status}
          onChange={(e) => onChange && onChange("status", e.target.value)}
          disabled={isReadOnly}
        >
          <MenuItem value="PENDING">PENDING</MenuItem>
          <MenuItem value="COMPLETED">COMPLETED</MenuItem>
        </TextField>

        <TextField
          type="number"
          label="Effort (hrs)*"
          value={form.effort}
          error={errors?.effort}
          disabled={isReadOnly}
          onChange={(e) => onChange && onChange("effort", +e.target.value)}
        />

        <div className="todo-form-actions">
          <Button
            variant="contained"
            onClick={mode === "VIEW" ? onCancel : onSubmit}
            disabled={loading}
            startIcon={loading && <CircularProgress size={18} />}
          >
            {loading
              ? mode === "EDIT"
                ? "Updating..."
                : "Adding..."
              : mode === "EDIT"
              ? "Update"
              : mode === "ADD"
              ? "Add Task"
              : "BACK"}
          </Button>

          {mode === "EDIT" && onCancel && (
            <Button variant="outlined" onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </Paper>
  );
}

export default memo(TaskForm);
