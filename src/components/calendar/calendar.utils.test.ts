import { describe, it, expect } from "vitest";
import { getWeekStart, formatMonthYear, formatDayName, tasksOverlap } from "./calendar.utils";
import type { TaskWithDates } from "./calendar.constants";

describe("getWeekStart", () => {
  it("returns Monday for a week starting date", () => {
    const monday = new Date("2026-02-09");
    const result = getWeekStart(monday);
    expect(result.getDay()).toBe(1);
  });

  it("returns Monday for a Wednesday", () => {
    const wednesday = new Date("2026-02-11");
    const result = getWeekStart(wednesday);
    expect(result.getDay()).toBe(1);
    expect(result.getDate()).toBe(9);
  });

  it("returns Monday for a Friday", () => {
    const friday = new Date("2026-02-13");
    const result = getWeekStart(friday);
    expect(result.getDay()).toBe(1);
  });

  it("returns Monday for a Sunday", () => {
    const sunday = new Date("2026-02-15");
    const result = getWeekStart(sunday);
    expect(result.getDay()).toBe(1);
  });

  it("handles year boundaries correctly", () => {
    const newYearDate = new Date("2026-01-01");
    const result = getWeekStart(newYearDate);
    expect(result.getDay()).toBe(1);
  });

  it("handles month boundaries correctly", () => {
    const monthEnd = new Date("2026-02-28");
    const result = getWeekStart(monthEnd);
    expect(result.getDay()).toBe(1);
  });
});

describe("formatMonthYear", () => {
  it("formats date as month and year", () => {
    const date = new Date("2026-02-15");
    const result = formatMonthYear(date);
    expect(result).toBe("February 2026");
  });

  it("handles January correctly", () => {
    const date = new Date("2026-01-15");
    const result = formatMonthYear(date);
    expect(result).toBe("January 2026");
  });

  it("handles December correctly", () => {
    const date = new Date("2026-12-15");
    const result = formatMonthYear(date);
    expect(result).toBe("December 2026");
  });

  it("handles different years", () => {
    const date = new Date("2025-06-15");
    const result = formatMonthYear(date);
    expect(result).toBe("June 2025");
  });
});

describe("formatDayName", () => {
  it("formats Monday correctly", () => {
    const monday = new Date("2026-02-09");
    const result = formatDayName(monday);
    expect(result).toBe("Mon");
  });

  it("formats Tuesday correctly", () => {
    const tuesday = new Date("2026-02-10");
    const result = formatDayName(tuesday);
    expect(result).toBe("Tue");
  });

  it("formats Wednesday correctly", () => {
    const wednesday = new Date("2026-02-11");
    const result = formatDayName(wednesday);
    expect(result).toBe("Wed");
  });

  it("formats Thursday correctly", () => {
    const thursday = new Date("2026-02-12");
    const result = formatDayName(thursday);
    expect(result).toBe("Thu");
  });

  it("formats Friday correctly", () => {
    const friday = new Date("2026-02-13");
    const result = formatDayName(friday);
    expect(result).toBe("Fri");
  });

  it("formats Saturday correctly", () => {
    const saturday = new Date("2026-02-14");
    const result = formatDayName(saturday);
    expect(result).toBe("Sat");
  });

  it("formats Sunday correctly", () => {
    const sunday = new Date("2026-02-15");
    const result = formatDayName(sunday);
    expect(result).toBe("Sun");
  });
});

describe("tasksOverlap", () => {
  const createTask = (startDay: number, duration: number): Omit<TaskWithDates, "row"> => ({
    id: 1,
    todo: "Test",
    completed: false,
    userId: 1,
    startDate: new Date(),
    endDate: new Date(),
    startDay,
    duration,
    description: "Test description",
  });

  it("detects overlap when tasks share days", () => {
    const task1 = createTask(0, 2);
    const task2 = createTask(1, 2);
    expect(tasksOverlap(task1, task2)).toBe(true);
  });

  it("detects no overlap when tasks are separate", () => {
    const task1 = createTask(0, 1);
    const task2 = createTask(3, 1);
    expect(tasksOverlap(task1, task2)).toBe(false);
  });

  it("detects overlap when task2 starts where task1 ends", () => {
    const task1 = createTask(0, 2);
    const task2 = createTask(3, 1);
    expect(tasksOverlap(task1, task2)).toBe(false);
  });

  it("detects overlap for tasks on same day", () => {
    const task1 = createTask(2, 0);
    const task2 = createTask(2, 0);
    expect(tasksOverlap(task1, task2)).toBe(true);
  });

  it("detects overlap when task1 contains task2", () => {
    const task1 = createTask(0, 6);
    const task2 = createTask(2, 2);
    expect(tasksOverlap(task1, task2)).toBe(true);
  });

  it("detects overlap when task2 contains task1", () => {
    const task1 = createTask(2, 2);
    const task2 = createTask(0, 6);
    expect(tasksOverlap(task1, task2)).toBe(true);
  });

  it("handles tasks at week start", () => {
    const task1 = createTask(0, 1);
    const task2 = createTask(0, 1);
    expect(tasksOverlap(task1, task2)).toBe(true);
  });

  it("handles tasks at week end", () => {
    const task1 = createTask(5, 1);
    const task2 = createTask(5, 1);
    expect(tasksOverlap(task1, task2)).toBe(true);
  });

  it("detects no overlap for adjacent tasks", () => {
    const task1 = createTask(0, 1);
    const task2 = createTask(2, 1);
    expect(tasksOverlap(task1, task2)).toBe(false);
  });

  it("handles zero duration tasks", () => {
    const task1 = createTask(0, 0);
    const task2 = createTask(1, 0);
    expect(tasksOverlap(task1, task2)).toBe(false);
  });

  it("detects overlap with partial overlap", () => {
    const task1 = createTask(1, 2);
    const task2 = createTask(2, 2);
    expect(tasksOverlap(task1, task2)).toBe(true);
  });

  it("handles reverse overlap check", () => {
    const task1 = createTask(3, 2);
    const task2 = createTask(1, 2);
    expect(tasksOverlap(task1, task2)).toBe(true);
    expect(tasksOverlap(task2, task1)).toBe(true);
  });
});
