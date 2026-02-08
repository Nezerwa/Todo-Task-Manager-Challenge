import type { Task, TaskPriority } from "@/types/task";
import profile1 from "@/assets/Profil1.jpg";
import profile2 from "@/assets/profile2.jpg";
import profile3 from "@/assets/profile3.jpg";

export const mockUsers = [
  { id: 1, name: "Eligrand Nezerwa", image: profile1 },
  { id: 2, name: "Patrick Kelly", image: profile2 },
  { id: 3, name: "Alfred Niyonzima", image: profile3 },
];

export const priorityColors: Record<TaskPriority, { badge: string; dot: string; bar: string }> = {
  low: {
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    dot: "bg-blue-500",
    bar: "bg-blue-500",
  },
  medium: {
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    dot: "bg-orange-500",
    bar: "bg-orange-500",
  },
  high: {
    badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    dot: "bg-red-500",
    bar: "bg-red-500",
  },
};

export const taskDescriptions = [
  "Revise the employee handbook to include rece...",
  "Develop and launch a new program to recogni...",
  "Conduct a thorough review of current health an...",
  "Develop and roll out a new onboarding process...",
  "Organize and prepare materials for the upco...",
];

export interface TaskWithDates extends Task {
  startDate: Date;
  endDate: Date;
  startDay: number;
  duration: number;
  description: string;
  row: number;
}
