import { isEndDateBeforeStartDate } from "../taskValidation";

test("returns true for invalid dates", () => {
  expect(isEndDateBeforeStartDate("2024-01-10", "2024-01-01")).toBe(true);
});

test("returns false for valid dates", () => {
  expect(isEndDateBeforeStartDate("2024-01-01", "2024-01-10")).toBe(false);
});
