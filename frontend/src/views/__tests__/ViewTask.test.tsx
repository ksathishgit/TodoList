import { render, screen, waitFor } from "@testing-library/react";
import ViewTask from "../ViewTask";
import TestProviders from "../../test/TestProviders";
import axios from "axios";

jest.mock("axios");

test("renders task in view mode", async () => {
  (axios.get as jest.Mock).mockResolvedValueOnce({
    data: {
      taskName: "View Task",
      description: "desc",
      startDate: "2024-01-01",
      endDate: "2024-01-02",
      status: "PENDING",
      effort: 5,
    },
  });

  render(
    <TestProviders>
      <ViewTask taskName="View Task" onBack={jest.fn()} />
    </TestProviders>
  );

  await waitFor(() => {
    expect(screen.getByDisplayValue("View Task")).toBeInTheDocument();
  });
});
