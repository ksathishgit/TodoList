import axios from "axios";
import { fetchAllTasks } from "../taskController";

jest.mock("axios");

test("fetchAllTasks calls correct endpoint", async () => {
  (axios.get as jest.Mock).mockResolvedValue({ data: [] });
  await fetchAllTasks();
  expect(axios.get).toHaveBeenCalled();
});
