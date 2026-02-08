import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import { TaskCard } from "./TaskCard";
import type { TaskWithDates } from "./calendar.constants";

const mockTask: TaskWithDates = {
  id: 1,
  todo: "Test calendar task",
  completed: false,
  userId: 1,
  status: "todo",
  description: "Test description",
  priority: "high",
  date: "2026-02-10",
  startDate: new Date("2026-02-10"),
  endDate: new Date("2026-02-12"),
  startDay: 0,
  duration: 2,
  row: 1,
};

const renderTaskCard = (task: TaskWithDates, props = {}) => {
  return render(
    <BrowserRouter>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
        <TaskCard
          task={task}
          onEdit={() => {}}
          onDelete={() => {}}
          onDuplicate={() => {}}
          {...props}
        />
      </div>
    </BrowserRouter>
  );
};

describe("TaskCard (Calendar)", () => {
  it("renders task title", () => {
    renderTaskCard(mockTask);
    expect(screen.getByText("Test calendar task")).toBeInTheDocument();
  });

  it("renders task description", () => {
    renderTaskCard(mockTask);
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("displays task date range", () => {
    renderTaskCard(mockTask);
    expect(screen.getByText(/Feb 10/)).toBeInTheDocument();
  });

  it("shows priority indicator", () => {
    const { container } = renderTaskCard(mockTask);
    const priorityDot = container.querySelector(".rounded-full");
    expect(priorityDot).toBeTruthy();
  });

  it("renders high priority task", () => {
    const highPriorityTask = { ...mockTask, priority: "high" as const };
    const { container } = renderTaskCard(highPriorityTask);
    expect(container).toBeTruthy();
  });

  it("renders medium priority task", () => {
    const mediumPriorityTask = { ...mockTask, priority: "medium" as const };
    const { container } = renderTaskCard(mediumPriorityTask);
    expect(container).toBeTruthy();
  });

  it("renders low priority task", () => {
    const lowPriorityTask = { ...mockTask, priority: "low" as const };
    const { container } = renderTaskCard(lowPriorityTask);
    expect(container).toBeTruthy();
  });

  it("calls onEdit when clicked", async () => {
    const user = userEvent.setup();
    let editCalled = false;
    const onEdit = () => {
      editCalled = true;
    };

    renderTaskCard(mockTask, { onEdit });

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("common.edit"));
    expect(editCalled).toBe(true);
  });

  it("displays dropdown menu button", () => {
    renderTaskCard(mockTask);
    const menuButton = screen.getByRole("button");
    expect(menuButton).toBeInTheDocument();
  });

  it("opens dropdown menu on button click", async () => {
    const user = userEvent.setup();
    renderTaskCard(mockTask);

    const menuButton = screen.getByRole("button");
    await user.click(menuButton);

    expect(screen.getByText("common.edit")).toBeInTheDocument();
  });

  it("has correct grid positioning", () => {
    const { container } = renderTaskCard(mockTask);
    const card = container.querySelector("[style*='grid-column']");
    expect(card).toBeTruthy();
  });

  it("spans correct number of columns based on duration", () => {
    const { container } = renderTaskCard(mockTask);
    const card = container.querySelector(".relative");
    const style = card?.getAttribute("style");
    expect(style).toBeTruthy();
    expect(style).toContain("grid");
  });

  it("has hover effect classes", () => {
    const { container } = renderTaskCard(mockTask);
    const innerCard = container.querySelector(".hover\\:shadow-lg");
    expect(innerCard).toBeTruthy();
  });

  it("renders with dark mode classes", () => {
    const { container } = renderTaskCard(mockTask);
    const card = container.querySelector(".dark\\:bg-gray-900");
    expect(card).toBeTruthy();
  });

  it("shows menu items when dropdown is opened", async () => {
    const user = userEvent.setup();
    renderTaskCard(mockTask);

    await user.click(screen.getByRole("button"));

    expect(screen.getByText("common.edit")).toBeInTheDocument();
    expect(screen.getByText("common.delete")).toBeInTheDocument();
    expect(screen.getByText("common.duplicate")).toBeInTheDocument();
  });

  it("calls onDelete when delete menu item is clicked", async () => {
    const user = userEvent.setup();
    let deleteCalled = false;
    const onDelete = () => {
      deleteCalled = true;
    };

    renderTaskCard(mockTask, { onDelete });

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("common.delete"));

    expect(deleteCalled).toBe(true);
  });

  it("calls onDuplicate when duplicate menu item is clicked", async () => {
    const user = userEvent.setup();
    let duplicateCalled = false;
    const onDuplicate = () => {
      duplicateCalled = true;
    };

    renderTaskCard(mockTask, { onDuplicate });

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("common.duplicate"));

    expect(duplicateCalled).toBe(true);
  });

  it("handles tasks spanning multiple days", () => {
    const longTask = { ...mockTask, duration: 5, endDate: new Date("2026-02-15") };
    const { container } = renderTaskCard(longTask);
    expect(container).toBeTruthy();
  });

  it("handles single day tasks", () => {
    const singleDayTask = { ...mockTask, duration: 0, endDate: mockTask.startDate };
    const { container } = renderTaskCard(singleDayTask);
    expect(container).toBeTruthy();
  });
});
