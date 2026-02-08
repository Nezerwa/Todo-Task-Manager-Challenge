import { describe, it, expect, beforeEach, vi } from "vitest";
import { useTaskStore } from "./taskStore";
import type { Task, TaskStatus } from "@/types/task";

const mockTask: Task = {
  id: 1,
  todo: "Test task",
  completed: false,
  userId: 1,
  status: "todo",
  description: "Test description",
  priority: "high",
  date: "2026-02-10",
};

const mockTask2: Task = {
  id: 2,
  todo: "Another task",
  completed: false,
  userId: 1,
  status: "in-progress",
  priority: "medium",
};

describe("useTaskStore", () => {
  beforeEach(() => {
    localStorage.clear();
    const store = useTaskStore.getState();
    store.setTasks([]);
  });

  describe("setTasks", () => {
    it("sets tasks array", () => {
      const store = useTaskStore.getState();
      const tasks = [mockTask, mockTask2];

      store.setTasks(tasks);
      const updatedStore = useTaskStore.getState();

      expect(updatedStore.tasks).toEqual(tasks);
      expect(updatedStore.tasks.length).toBe(2);
    });

    it("overwrites existing tasks", () => {
      const store = useTaskStore.getState();
      store.setTasks([mockTask]);
      store.setTasks([mockTask2]);
      const updatedStore = useTaskStore.getState();

      expect(updatedStore.tasks).toEqual([mockTask2]);
      expect(updatedStore.tasks.length).toBe(1);
    });
  });

  describe("addTask", () => {
    it("adds a new task to empty array", () => {
      const store = useTaskStore.getState();

      store.addTask(mockTask);
      const updatedStore = useTaskStore.getState();

      expect(updatedStore.tasks).toContainEqual(mockTask);
      expect(updatedStore.tasks.length).toBe(1);
    });

    it("adds task to existing tasks", () => {
      const store = useTaskStore.getState();
      store.setTasks([mockTask]);

      store.addTask(mockTask2);
      const updatedStore = useTaskStore.getState();

      expect(updatedStore.tasks.length).toBe(2);
      expect(updatedStore.tasks).toContainEqual(mockTask);
      expect(updatedStore.tasks).toContainEqual(mockTask2);
    });

    it("maintains original tasks when adding new one", () => {
      const store = useTaskStore.getState();
      store.addTask(mockTask);

      const tasksBefore = [...useTaskStore.getState().tasks];
      store.addTask(mockTask2);
      const updatedStore = useTaskStore.getState();

      expect(updatedStore.tasks[0]).toEqual(tasksBefore[0]);
    });
  });

  describe("updateTask", () => {
    beforeEach(() => {
      const store = useTaskStore.getState();
      store.setTasks([mockTask, mockTask2]);
    });

    it("updates task properties", () => {
      const store = useTaskStore.getState();

      store.updateTask(1, { todo: "Updated task", completed: true });
      const updatedStore = useTaskStore.getState();

      const updatedTask = updatedStore.tasks.find((t) => t.id === 1);
      expect(updatedTask?.todo).toBe("Updated task");
      expect(updatedTask?.completed).toBe(true);
    });

    it("updates partial task properties", () => {
      const store = useTaskStore.getState();

      store.updateTask(1, { priority: "low" });
      const updatedStore = useTaskStore.getState();

      const updatedTask = updatedStore.tasks.find((t) => t.id === 1);
      expect(updatedTask?.priority).toBe("low");
      expect(updatedTask?.todo).toBe("Test task");
    });

    it("does not affect other tasks", () => {
      const store = useTaskStore.getState();

      store.updateTask(1, { todo: "Updated" });
      const updatedStore = useTaskStore.getState();

      const otherTask = updatedStore.tasks.find((t) => t.id === 2);
      expect(otherTask).toEqual(mockTask2);
    });

    it("handles non-existent task id", () => {
      const store = useTaskStore.getState();
      const tasksBefore = [...useTaskStore.getState().tasks];

      store.updateTask(999, { todo: "Updated" });
      const updatedStore = useTaskStore.getState();

      expect(updatedStore.tasks).toEqual(tasksBefore);
    });

    it("updates multiple properties at once", () => {
      const store = useTaskStore.getState();

      store.updateTask(1, {
        todo: "New todo",
        status: "done",
        completed: true,
        priority: "low",
      });
      const updatedStore = useTaskStore.getState();

      const updated = updatedStore.tasks.find((t) => t.id === 1);
      expect(updated?.todo).toBe("New todo");
      expect(updated?.status).toBe("done");
      expect(updated?.completed).toBe(true);
      expect(updated?.priority).toBe("low");
    });
  });

  describe("deleteTask", () => {
    beforeEach(() => {
      const store = useTaskStore.getState();
      store.setTasks([mockTask, mockTask2]);
    });

    it("removes task by id", () => {
      const store = useTaskStore.getState();

      store.deleteTask(1);
      const updatedStore = useTaskStore.getState();

      expect(updatedStore.tasks.length).toBe(1);
      expect(updatedStore.tasks.find((t) => t.id === 1)).toBeUndefined();
    });

    it("keeps other tasks intact", () => {
      const store = useTaskStore.getState();

      store.deleteTask(1);
      const updatedStore = useTaskStore.getState();

      expect(updatedStore.tasks).toContainEqual(mockTask2);
    });

    it("handles non-existent task id", () => {
      const store = useTaskStore.getState();
      const tasksBefore = [...useTaskStore.getState().tasks];

      store.deleteTask(999);
      const updatedStore = useTaskStore.getState();

      expect(updatedStore.tasks).toEqual(tasksBefore);
    });

    it("can delete last task", () => {
      const store = useTaskStore.getState();

      store.deleteTask(1);
      store.deleteTask(2);
      const updatedStore = useTaskStore.getState();

      expect(updatedStore.tasks.length).toBe(0);
    });
  });

  describe("moveTask", () => {
    beforeEach(() => {
      const store = useTaskStore.getState();
      store.setTasks([mockTask, mockTask2]);
    });

    it("updates task status", () => {
      const store = useTaskStore.getState();

      store.moveTask(1, "done");
      const updatedStore = useTaskStore.getState();

      const movedTask = updatedStore.tasks.find((t) => t.id === 1);
      expect(movedTask?.status).toBe("done");
    });

    it("preserves other task properties", () => {
      const store = useTaskStore.getState();

      store.moveTask(1, "review");
      const updatedStore = useTaskStore.getState();

      const movedTask = updatedStore.tasks.find((t) => t.id === 1);
      expect(movedTask?.todo).toBe("Test task");
      expect(movedTask?.priority).toBe("high");
      expect(movedTask?.description).toBe("Test description");
    });

    it("does not affect other tasks", () => {
      const store = useTaskStore.getState();

      store.moveTask(1, "done");
      const updatedStore = useTaskStore.getState();

      const otherTask = updatedStore.tasks.find((t) => t.id === 2);
      expect(otherTask?.status).toBe("in-progress");
    });

    it("handles non-existent task id", () => {
      const store = useTaskStore.getState();
      const tasksBefore = [...useTaskStore.getState().tasks];

      store.moveTask(999, "done");
      const updatedStore = useTaskStore.getState();

      expect(updatedStore.tasks).toEqual(tasksBefore);
    });

    it("can move through multiple statuses", () => {
      const store = useTaskStore.getState();

      store.moveTask(1, "in-progress");
      expect(useTaskStore.getState().tasks.find((t) => t.id === 1)?.status).toBe("in-progress");

      store.moveTask(1, "review");
      expect(useTaskStore.getState().tasks.find((t) => t.id === 1)?.status).toBe("review");

      store.moveTask(1, "done");
      expect(useTaskStore.getState().tasks.find((t) => t.id === 1)?.status).toBe("done");
    });
  });

  describe("getTasksByStatus", () => {
    beforeEach(() => {
      const store = useTaskStore.getState();
      const tasks: Task[] = [
        { ...mockTask, id: 1, status: "todo" },
        { ...mockTask, id: 2, status: "todo" },
        { ...mockTask, id: 3, status: "in-progress" },
        { ...mockTask, id: 4, status: "review" },
        { ...mockTask, id: 5, status: "done" },
      ];
      store.setTasks(tasks);
    });

    it("filters tasks by status", () => {
      const store = useTaskStore.getState();

      const todoTasks = store.getTasksByStatus("todo");

      expect(todoTasks.length).toBe(2);
      expect(todoTasks.every((t) => t.status === "todo")).toBe(true);
    });

    it("returns empty array for status with no tasks", () => {
      const store = useTaskStore.getState();
      store.setTasks([mockTask]);

      const reviewTasks = store.getTasksByStatus("review");

      expect(reviewTasks).toEqual([]);
    });

    it("returns all matching tasks for each status", () => {
      const store = useTaskStore.getState();

      const todoTasks = store.getTasksByStatus("todo");
      const inProgressTasks = store.getTasksByStatus("in-progress");
      const reviewTasks = store.getTasksByStatus("review");
      const doneTasks = store.getTasksByStatus("done");

      expect(todoTasks.length).toBe(2);
      expect(inProgressTasks.length).toBe(1);
      expect(reviewTasks.length).toBe(1);
      expect(doneTasks.length).toBe(1);
    });

    it("maintains task properties when filtering", () => {
      const store = useTaskStore.getState();

      const todoTasks = store.getTasksByStatus("todo");

      todoTasks.forEach((task) => {
        expect(task).toHaveProperty("id");
        expect(task).toHaveProperty("todo");
        expect(task).toHaveProperty("status");
      });
    });
  });

  describe("persistence", () => {
    it("initializes with empty tasks array", () => {
      const store = useTaskStore.getState();
      expect(store.tasks).toEqual([]);
    });

    it("has all required methods", () => {
      const store = useTaskStore.getState();

      expect(typeof store.setTasks).toBe("function");
      expect(typeof store.addTask).toBe("function");
      expect(typeof store.updateTask).toBe("function");
      expect(typeof store.deleteTask).toBe("function");
      expect(typeof store.moveTask).toBe("function");
      expect(typeof store.getTasksByStatus).toBe("function");
    });
  });
});
