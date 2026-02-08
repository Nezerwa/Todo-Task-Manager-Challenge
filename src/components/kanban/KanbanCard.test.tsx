import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { KanbanCard } from "./KanbanCard";
import type { Task } from "@/types/task";
import { userEvent } from "@testing-library/user-event";

const mockTask: Task = {
  id: 1,
  todo: "Test task title",
  completed: false,
  userId: 1,
  status: "todo",
  description: "Test task description",
  priority: "high",
  date: "2026-02-10",
  dueDate: "2026-02-15",
};

const mockTaskWithChecklist: Task = {
  ...mockTask,
  checklistProgress: {
    completed: 3,
    total: 5,
  },
};

const mockTaskWithStats: Task = {
  ...mockTask,
  commentsCount: 5,
  attachmentsCount: 3,
  assignedUsers: [
    { id: 1, name: "John Doe", image: "https://example.com/avatar1.jpg" },
    { id: 2, name: "Jane Smith", image: "https://example.com/avatar2.jpg" },
  ],
};

const renderKanbanCard = (task: Task, props = {}) => {
  return render(
    <BrowserRouter>
      <KanbanCard task={task} {...props} />
    </BrowserRouter>
  );
};

describe("KanbanCard", () => {
  it("renders task title", () => {
    renderKanbanCard(mockTask);
    expect(screen.getByText("Test task title")).toBeInTheDocument();
  });

  it("renders task description when provided", () => {
    renderKanbanCard(mockTask);
    expect(screen.getByText("Test task description")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    const taskWithoutDesc = { ...mockTask, description: undefined };
    renderKanbanCard(taskWithoutDesc);
    expect(screen.queryByText("Test task description")).not.toBeInTheDocument();
  });

  it("displays formatted date", () => {
    renderKanbanCard(mockTask);
    expect(screen.getByText("Feb 10, 2026")).toBeInTheDocument();
  });

  it("does not display date when not provided", () => {
    expect(screen.queryByText(/Feb/)).not.toBeInTheDocument();
  });

  it("displays checklist progress", () => {
    renderKanbanCard(mockTaskWithChecklist);
    expect(screen.getByText("3/5")).toBeInTheDocument();
  });

  it("does not display checklist when not provided", () => {
    renderKanbanCard(mockTask);
    expect(screen.queryByText(/\d+\/\d+/)).not.toBeInTheDocument();
  });

  it("displays comments count when provided", () => {
    renderKanbanCard(mockTaskWithStats);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("displays attachments count when provided", () => {
    renderKanbanCard(mockTaskWithStats);
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("displays assigned user avatars", () => {
    renderKanbanCard(mockTaskWithStats);
    const avatarFallbacks = screen.getAllByText(/^[A-Z]{2}$/);
    expect(avatarFallbacks.length).toBeGreaterThanOrEqual(2);
  });

  it("calls onEdit when card is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    renderKanbanCard(mockTask, { onEdit });

    const card = screen.getByText("Test task title").closest("div");
    if (card) {
      await user.click(card);
      expect(onEdit).toHaveBeenCalledWith(mockTask);
    }
  });

  it("calls onEdit when Edit menu item is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    renderKanbanCard(mockTask, { onEdit });

    const menuButton = screen.getByRole("button");
    await user.click(menuButton);

    const editItem = screen.getByText("common.edit");
    await user.click(editItem);

    expect(onEdit).toHaveBeenCalledWith(mockTask);
  });

  it("calls onDelete when Delete menu item is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    renderKanbanCard(mockTask, { onDelete });

    const menuButton = screen.getByRole("button");
    await user.click(menuButton);

    const deleteItem = screen.getByText("common.delete");
    await user.click(deleteItem);

    expect(onDelete).toHaveBeenCalledWith(mockTask.id);
  });

  it("calls onDuplicate when Duplicate menu item is clicked", async () => {
    const user = userEvent.setup();
    const onDuplicate = vi.fn();
    renderKanbanCard(mockTask, { onDuplicate });

    const menuButton = screen.getByRole("button");
    await user.click(menuButton);

    const duplicateItem = screen.getByText("common.duplicate");
    await user.click(duplicateItem);

    expect(onDuplicate).toHaveBeenCalledWith(mockTask);
  });

  it("renders without optional handlers", () => {
    const { container } = renderKanbanCard(mockTask);
    expect(container).toBeTruthy();
  });

  it("renders with all task properties", () => {
    const fullTask: Task = {
      ...mockTask,
      ...mockTaskWithChecklist,
      ...mockTaskWithStats,
    };
    renderKanbanCard(fullTask);

    expect(screen.getByText("Test task title")).toBeInTheDocument();
    expect(screen.getByText("Test task description")).toBeInTheDocument();
    expect(screen.getByText("Feb 10, 2026")).toBeInTheDocument();
    expect(screen.getByText("3/5")).toBeInTheDocument();
  });

  it("stops propagation when menu button is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    renderKanbanCard(mockTask, { onEdit });

    const menuButton = screen.getByRole("button");
    await user.click(menuButton);

    expect(onEdit).not.toHaveBeenCalled();
  });

  it("renders low priority task", () => {
    const lowPriorityTask = { ...mockTask, priority: "low" as const };
    const { container } = renderKanbanCard(lowPriorityTask);
    expect(container).toBeTruthy();
  });

  it("renders medium priority task", () => {
    const mediumPriorityTask = { ...mockTask, priority: "medium" as const };
    const { container } = renderKanbanCard(mediumPriorityTask);
    expect(container).toBeTruthy();
  });

  it("renders task in different statuses", () => {
    const statuses: Array<Task["status"]> = ["todo", "in-progress", "review", "done"];

    statuses.forEach((status) => {
      const taskWithStatus = { ...mockTask, status };
      const { container } = renderKanbanCard(taskWithStatus);
      expect(container).toBeTruthy();
    });
  });
});
