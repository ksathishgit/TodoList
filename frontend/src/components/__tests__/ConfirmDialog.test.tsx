import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmDialog from "../ConfirmDialog";
import TestProviders from "../../test/TestProviders";

describe("ConfirmDialog", () => {
  test("renders dialog content", () => {
    render(
      <TestProviders>
        <ConfirmDialog
          open
          title="Confirm"
          description="Are you sure?"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />
      </TestProviders>
    );

    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <TestProviders>
        <ConfirmDialog
          open
          title="Confirm"
          description="Are you sure?"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />
      </TestProviders>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("calls onCancel when cancel button clicked", () => {
    const onCancel = jest.fn();
    render(
      <TestProviders>
        <ConfirmDialog
          open
          title="Confirm"
          description="Confirm delete"
          onConfirm={jest.fn()}
          onCancel={onCancel}
        />
      </TestProviders>
    );
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalled();
  });
});
