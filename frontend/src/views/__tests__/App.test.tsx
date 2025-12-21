import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import TestProviders from "../../test/TestProviders";
import axios from "axios";
import * as taskApi from "../../controllers/taskController";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";

jest.mock("axios");

jest.mock("../../controllers/taskController", () => ({
  fetchAllTasks: jest.fn(),
}));

describe("Home App", () => {
  test("renders task list on load", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: [],
    });
    render(
      <TestProviders>
        <App />
      </TestProviders>
    );
    await waitFor(() =>
      expect(screen.getByText(/task list/i)).toBeInTheDocument()
    );
  });

  test("toggles between TaskList and AddTask without act warnings", async () => {
    (taskApi.fetchAllTasks as jest.Mock).mockResolvedValueOnce({
      data: [],
    });
    render(
      <TestProviders>
        <App />
      </TestProviders>
    );
    await waitFor(() => {
      expect(screen.getByText(/task list/i)).toBeInTheDocument();
    });
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /add task/i }));
    // expect(screen.getByText(/add task/i)).toBeInTheDocument();
    expect(
      screen.getByText(/^add task$/i, { selector: "h1, h2, h3, p" })
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /back/i }));
    // expect(screen.getByText(/task list/i)).toBeInTheDocument();
    expect(
      screen.getByText(/^task list$/i, { selector: "h1, h2, h3, p" })
    ).toBeInTheDocument();
  });
  test("shows error toast when fetchAllTasks fails", async () => {
    (taskApi.fetchAllTasks as jest.Mock).mockRejectedValueOnce(
      new Error("API error")
    );
    render(
      <TestProviders>
        <App />
      </TestProviders>
    );
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to load tasks");
    });
  });
  test("toggles add and back button multiple times", async () => {
    (taskApi.fetchAllTasks as jest.Mock).mockResolvedValueOnce({ data: [] });
    const user = userEvent.setup();
    render(
      <TestProviders>
        <App />
      </TestProviders>
    );
    await screen.findByText(/task list/i);
    await user.click(screen.getByRole("button", { name: /add task/i }));
    await user.click(screen.getByRole("button", { name: /back/i }));
    await user.click(screen.getByRole("button", { name: /add task/i }));
    expect(
      screen.getByText(/^add task$/i, { selector: "h1, h2, h3, p" })
    ).toBeInTheDocument();
  });
});
