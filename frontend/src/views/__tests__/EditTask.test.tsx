import { render, screen, waitFor } from "@testing-library/react";
import EditTask from "../EditTask";
import TestProviders from "../../test/TestProviders";
import userEvent from "@testing-library/user-event";
import { Task } from "../../types/tasks";
import { toast } from "react-toastify";
import * as taskApi from "../../controllers/taskController";

jest.mock("axios");

jest.mock("../../controllers/taskController", () => ({
  updateTaskById: jest.fn(),
}));

describe("EditTask", () => {
  const mockTask: Task = {
    _id: "1",
    taskName: "Edit Task",
    description: "Task description",
    startDate: "2024-01-01",
    endDate: "2024-01-02",
    status: "PENDING",
    effort: 5,
  };

  test("renders EditTask form with prefilled values", () => {
    render(
      <TestProviders>
        <EditTask
          taskId="1"
          task={mockTask}
          onUpdated={jest.fn()}
          onCancel={jest.fn()}
        />
      </TestProviders>
    );

    // Heading
    expect(screen.getByText(/edit task/i)).toBeInTheDocument();

    // Prefilled, non-editable task name
    expect(screen.getByDisplayValue("Edit Task")).toBeInTheDocument();
  });

  test("calls onCancel when Cancel button is clicked", () => {
    const onCancel = jest.fn();

    render(
      <TestProviders>
        <EditTask
          taskId="1"
          task={mockTask}
          onUpdated={jest.fn()}
          onCancel={onCancel}
        />
      </TestProviders>
    );

    const backButton = screen.getByRole("button", {
      name: /cancel/i,
    });

    backButton.click();

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test("submits edited task and calls onUpdated", async () => {
    const onUpdated = jest.fn();
    (taskApi.updateTaskById as jest.Mock).mockResolvedValueOnce({});
    render(
      <TestProviders>
        <EditTask
          taskId="1"
          task={mockTask}
          onUpdated={onUpdated}
          onCancel={jest.fn()}
        />
      </TestProviders>
    );
    const user = userEvent.setup();
    await user.clear(screen.getByPlaceholderText(/description/i));
    await user.type(
      screen.getByPlaceholderText(/description/i),
      "Updated desc"
    );
    await user.click(screen.getByRole("button", { name: /update/i }));
    await waitFor(() => {
      expect(taskApi.updateTaskById).toHaveBeenCalled();
      expect(onUpdated).toHaveBeenCalled();
    });
  });

  test("shows error toast when updateTask fails", async () => {
    (taskApi.updateTaskById as jest.Mock).mockRejectedValueOnce(
      new Error("Update failed")
    );
    render(
      <TestProviders>
        <EditTask
          taskId="1"
          task={mockTask}
          onUpdated={jest.fn()}
          onCancel={jest.fn()}
        />
      </TestProviders>
    );
    const user = userEvent.setup();
    await user.clear(screen.getByPlaceholderText(/description/i));
    await user.type(
      screen.getByPlaceholderText(/description/i),
      "Updated desc"
    );
    await user.click(screen.getByRole("button", { name: /update/i }));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  test("calls onCancel when cancel button is clicked", async () => {
    const onCancel = jest.fn();
    render(
      <TestProviders>
        <EditTask
          taskId="1"
          task={mockTask}
          onUpdated={jest.fn()}
          onCancel={onCancel}
        />
      </TestProviders>
    );
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalled();
  });
});
