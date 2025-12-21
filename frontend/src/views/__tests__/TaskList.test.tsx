import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskList from "../TaskList";
import TestProviders from "../../test/TestProviders";
import userEvent from "@testing-library/user-event";

const mockTasks: any = [
  {
    _id: "1",
    taskName: "Test Task",
    description: "Desc",
    startDate: "2024-01-01",
    endDate: "2024-01-02",
    status: "PENDING",
    effort: 5,
  },
];

describe("TaskList", () => {
  test("renders task row", () => {
    render(
      <TestProviders>
        <TaskList
          tasks={mockTasks}
          loading={false}
          onEditTask={jest.fn()}
          onViewTask={jest.fn()}
          onTaskUpdated={jest.fn()}
        />
      </TestProviders>
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <TestProviders>
        <TaskList
          tasks={mockTasks}
          loading={false}
          onEditTask={jest.fn()}
          onViewTask={jest.fn()}
          onTaskUpdated={jest.fn()}
        />
      </TestProviders>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders empty state", () => {
    render(
      <TestProviders>
        <TaskList
          tasks={[]}
          loading={false}
          onEditTask={jest.fn()}
          onViewTask={jest.fn()}
          onTaskUpdated={jest.fn()}
        />
      </TestProviders>
    );

    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  test("renders loading spinner", () => {
    render(
      <TestProviders>
        <TaskList
          tasks={[]}
          loading
          onEditTask={jest.fn()}
          onViewTask={jest.fn()}
          onTaskUpdated={jest.fn()}
        />
      </TestProviders>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("clicks edit and view actions", () => {
    const onEditTask = jest.fn();
    const onViewTask = jest.fn();

    render(
      <TestProviders>
        <TaskList
          tasks={mockTasks}
          loading={false}
          onEditTask={onEditTask}
          onViewTask={onViewTask}
          onTaskUpdated={jest.fn()}
        />
      </TestProviders>
    );

    fireEvent.click(screen.getByLabelText("edit-task"));
    fireEvent.click(screen.getByLabelText("view-task"));

    expect(onEditTask).toHaveBeenCalledTimes(1);
    expect(onViewTask).toHaveBeenCalledTimes(1);
  });

  test("disables edit for completed task", () => {
    const completedTask: any = [
      {
        _id: "1",
        taskName: "Done Task",
        description: "",
        startDate: "2024-01-01",
        endDate: "2024-01-02",
        status: "COMPLETED",
        effort: 3,
      },
    ];

    render(
      <TestProviders>
        <TaskList
          tasks={completedTask}
          loading={false}
          onEditTask={jest.fn()}
          onViewTask={jest.fn()}
          onTaskUpdated={jest.fn()}
        />
      </TestProviders>
    );
    expect(screen.getByLabelText("edit-task")).toHaveAttribute("disabled");
  });

  test("opens delete confirmation dialog", () => {
    render(
      <TestProviders>
        <TaskList
          tasks={mockTasks}
          loading={false}
          onEditTask={jest.fn()}
          onViewTask={jest.fn()}
          onTaskUpdated={jest.fn()}
        />
      </TestProviders>
    );

    fireEvent.click(screen.getByLabelText("delete-task"));

    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
  });

  test("confirms delete and deletes task", async () => {
    const onTaskUpdated = jest.fn();
    render(
      <TestProviders>
        <TaskList
          tasks={mockTasks}
          loading={false}
          onEditTask={jest.fn()}
          onViewTask={jest.fn()}
          onTaskUpdated={onTaskUpdated}
        />
      </TestProviders>
    );
    fireEvent.click(screen.getByLabelText("delete-task"));
    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));
    await waitFor(() => {
      expect(onTaskUpdated).toHaveBeenCalled();
    });
  });
  test("cancels delete confirmation dialog", async () => {
    const user = userEvent.setup();
    render(
      <TestProviders>
        <TaskList
          tasks={mockTasks}
          loading={false}
          onEditTask={jest.fn()}
          onViewTask={jest.fn()}
          onTaskUpdated={jest.fn()}
        />
      </TestProviders>
    );
    await user.click(screen.getByLabelText("delete-task"));
    expect(
      screen.getByText(/are you sure you want to delete this task/i)
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /cancel/i }));
    await waitFor(() => {
      expect(
        screen.queryByText(/are you sure you want to delete this task/i)
      ).not.toBeInTheDocument();
    });
  });
  test("updates task status after confirmation", async () => {
    const onTaskUpdated = jest.fn();
    render(
      <TestProviders>
        <TaskList
          tasks={mockTasks}
          loading={false}
          onEditTask={jest.fn()}
          onViewTask={jest.fn()}
          onTaskUpdated={onTaskUpdated}
        />
      </TestProviders>
    );
    fireEvent.click(screen.getByText(/mark as complete/i));
    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));
    await waitFor(() => {
      expect(onTaskUpdated).toHaveBeenCalled();
    });
  });
});
