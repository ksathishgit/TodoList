import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddTask from "../AddTask";
import TestProviders from "../../test/TestProviders";
import { toast } from "react-toastify";

import axios from "axios";
jest.mock("axios");

describe("AddTask", () => {
  test("shows validation error when submitting empty form", async () => {
    render(
      <TestProviders>
        <AddTask onTaskAdded={jest.fn()} />
      </TestProviders>
    );
    await userEvent.click(screen.getByRole("button", { name: /add task/i }));
    expect(toast.error).toHaveBeenCalledWith(
      "Please fix the highlighted fields"
    );
  });

  test("creates task successfully", async () => {
    const onTaskAdded = jest.fn();
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { message: "Task created" },
    });
    render(
      <TestProviders>
        <AddTask onTaskAdded={onTaskAdded} />
      </TestProviders>
    );
    await userEvent.type(screen.getByPlaceholderText(/task name/i), "New Task");
    await userEvent.type(screen.getByPlaceholderText(/description/i), "desc");
    await userEvent.type(screen.getByLabelText(/effort/i), "5");
    const user = userEvent.setup();
    fireEvent.mouseDown(screen.getByLabelText(/status/i));
    await user.click(screen.getByText(/pending/i));
    const startDateInput = screen.getByLabelText(/start date/i, {
      selector: "input",
    });
    const endDateInput = screen.getByLabelText(/end date/i, {
      selector: "input",
    });
    await userEvent.type(startDateInput, "01/01/2025");
    await userEvent.type(endDateInput, "01/01/2025");
    await userEvent.click(screen.getByRole("button", { name: /add task/i }));
    await waitFor(() => {
      expect(onTaskAdded).toHaveBeenCalledTimes(1);
    });
  });
});
