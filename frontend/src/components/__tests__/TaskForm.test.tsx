import { render, screen } from "@testing-library/react";
import TaskForm from "../TaskForm";
import TestProviders from "../../test/TestProviders";
import {
  INITIAL_FORM_ERRORS,
  INITIAL_TASK_FORM,
} from "../../constants/appConstants";

describe("TaskForm", () => {
  test("matches snapshot in ADD mode", () => {
    const { asFragment } = render(
      <TestProviders>
        <TaskForm
          title="Add Task"
          form={INITIAL_TASK_FORM}
          mode="ADD"
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
        />
      </TestProviders>
    );

    expect(asFragment()).toMatchSnapshot();
  });
  test("renders in VIEW mode", () => {
    render(
      <TestProviders>
        <TaskForm
          title="View Task"
          form={INITIAL_TASK_FORM}
          mode="VIEW"
          onCancel={jest.fn()}
        />
      </TestProviders>
    );

    const taskNameInput = screen.getByPlaceholderText(/task name/i);

    expect(taskNameInput).toBeDisabled();
  });
  test("renders validation error state", () => {
    render(
      <TestProviders>
        <TaskForm
          title="Add Task"
          form={INITIAL_TASK_FORM}
          mode="ADD"
          errors={{ ...INITIAL_FORM_ERRORS, taskName: true }}
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
        />
      </TestProviders>
    );

    expect(screen.getByPlaceholderText(/task name/i)).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });
});
