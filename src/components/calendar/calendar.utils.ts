import type { TaskWithDates } from "./calendar.constants";

export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
  return new Date(d.setDate(diff));
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function formatDayName(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export function tasksOverlap(
  task1: Omit<TaskWithDates, "row">,
  task2: Omit<TaskWithDates, "row">
): boolean {
  const end1 = task1.startDay + task1.duration + 1;
  const end2 = task2.startDay + task2.duration + 1;
  return !(end1 <= task2.startDay || end2 <= task1.startDay);
}
