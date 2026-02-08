export type TaskStatus = "todo" | "in-progress" | "review" | "done";

export type TaskPriority = "low" | "medium" | "high";

export interface User {
  id: number;
  name: string;
  image: string;
}

export interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

export interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  // Extended fields for our UI
  status?: TaskStatus;
  description?: string;
  priority?: TaskPriority;
  date?: string;
  dueDate?: string;
  checklist?: ChecklistItem[];
  checklistProgress?: { completed: number; total: number };
  commentsCount?: number;
  attachmentsCount?: number;
  assignedUsers?: User[];
}

export interface TaskFormData {
  todo: string;
  completed: boolean;
  userId: number;
  status?: TaskStatus;
  description?: string;
  priority?: TaskPriority;
  date?: string;
  dueDate?: string;
}

export interface TodosResponse {
  todos: Task[];
  total: number;
  skip: number;
  limit: number;
}
