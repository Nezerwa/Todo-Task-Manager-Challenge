import type { TaskStatus } from "@/types/task";

export const statusColors = {
  High: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  Medium: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

export const statusOrder: Record<TaskStatus, number> = {
  todo: 1,
  "in-progress": 2,
  review: 3,
  done: 4,
};

export const statusLabels: Record<TaskStatus, string> = {
  todo: "To-do",
  "in-progress": "On Progress",
  review: "Need Review",
  done: "Done",
};

export const statusBadgeColors: Record<TaskStatus, string> = {
  todo: "#EF4444",
  "in-progress": "#3B82F6",
  review: "#F59E0B",
  done: "#10B981",
};

export const statusBadgeColorsDark: Record<TaskStatus, string> = {
  todo: "#F87171",
  "in-progress": "#60A5FA",
  review: "#FBBF24",
  done: "#34D399",
};
