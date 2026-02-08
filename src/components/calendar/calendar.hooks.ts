import { useState, useMemo, useEffect, useCallback } from "react";
import { useTaskStore } from "@/stores/taskStore";
import { useCreateTodo, useDeleteTodo, useUpdateTodo } from "@/hooks/useTasks";
import type { Task, TaskStatus, TaskPriority } from "@/types/task";
import { mockUsers, taskDescriptions, type TaskWithDates } from "./calendar.constants";
import { getWeekStart, tasksOverlap } from "./calendar.utils";

export function useTaskPopulation(
  todosResponse: { todos: Task[] } | undefined,
  tasks: Task[],
  setTasks: (tasks: Task[]) => void
) {
  useEffect(() => {
    if (tasks.length > 0 || !todosResponse?.todos) return;

    const transformedTasks = todosResponse.todos.map((task: Task, index: number) => {
      const statusIndex = index % 4;
      const statuses: TaskStatus[] = ["todo", "in-progress", "review", "done"];
      const userCount = Math.floor(Math.random() * 3) + 1;
      const assignedUsers = mockUsers.slice(0, userCount);

      return {
        ...task,
        status: statuses[statusIndex],
        priority: (
          [
            "high",
            "low",
            "medium",
            "low",
            "high",
            "medium",
            "medium",
            "high",
            "low",
            "high",
            "medium",
            "low",
          ] as TaskPriority[]
        )[index % 12],
        description: "Task description for demonstration",
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        commentsCount: Math.floor(Math.random() * 10),
        attachmentsCount: Math.floor(Math.random() * 5),
        assignedUsers,
      };
    });
    setTasks(transformedTasks);
  }, [todosResponse, setTasks, tasks.length]);
}

export function useWeekNavigation(initialDate = new Date()) {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const weekDays = useMemo(() => {
    const start = getWeekStart(currentDate);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      days.push(date);
    }
    return days;
  }, [currentDate]);

  const goToPreviousWeek = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  }, [currentDate]);

  const goToNextWeek = useCallback(() => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  }, [currentDate]);

  return { currentDate, weekDays, goToPreviousWeek, goToNextWeek };
}

export function useTaskHandlers(
  onEditTask?: (task: Task) => void,
  onDeleteTask?: (task: Task) => void,
  onDuplicateTask?: (task: Task) => void
) {
  const { tasks, addTask, updateTask, deleteTask: deleteTaskFromStore } = useTaskStore();
  const createTodoMutation = useCreateTodo();
  const deleteTodoMutation = useDeleteTodo();
  const updateTodoMutation = useUpdateTodo();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [createTaskStatus, setCreateTaskStatus] = useState<TaskStatus>("todo");

  const handleEditTask = useCallback(
    (task: Task) => {
      setSelectedTask(task);
      setEditDialogOpen(true);
      onEditTask?.(task);
    },
    [onEditTask]
  );

  const handleDeleteTask = useCallback((task: Task) => {
    setSelectedTask(task);
    setDeleteDialogOpen(true);
  }, []);

  const handleDuplicateTask = useCallback(
    (task: Task) => {
      const newTask = {
        ...task,
        id: Math.max(...tasks.map((t) => t.id), 0) + 1,
        todo: `${task.todo} (Copy)`,
      };
      addTask(newTask);
      createTodoMutation.mutate({
        todo: newTask.todo,
        completed: newTask.completed,
        userId: newTask.userId,
      });
      onDuplicateTask?.(task);
    },
    [tasks, addTask, createTodoMutation, onDuplicateTask]
  );

  const handleAddTask = useCallback(() => {
    setCreateTaskStatus("todo");
    setCreateDialogOpen(true);
  }, []);

  const handleCreateTask = useCallback(
    (taskData: {
      todo: string;
      status: TaskStatus;
      description: string;
      assignedUsers: typeof mockUsers;
    }) => {
      const newTask: Task = {
        id: Math.max(...tasks.map((t) => t.id), 0) + 1,
        todo: taskData.todo,
        completed: false,
        userId: 1,
        status: taskData.status,
        description: taskData.description,
        assignedUsers: taskData.assignedUsers,
      };
      addTask(newTask);
      createTodoMutation.mutate({
        todo: newTask.todo,
        completed: newTask.completed,
        userId: newTask.userId,
      });
      setCreateDialogOpen(false);
    },
    [tasks, addTask, createTodoMutation]
  );

  const handleSaveTask = useCallback(
    (updatedTask: Task) => {
      updateTask(updatedTask.id, updatedTask);
      updateTodoMutation.mutate({
        id: updatedTask.id,
        data: {
          todo: updatedTask.todo,
          completed: updatedTask.completed,
        },
      });
      setEditDialogOpen(false);
    },
    [updateTask, updateTodoMutation]
  );

  const handleConfirmDelete = useCallback(() => {
    if (selectedTask) {
      deleteTaskFromStore(selectedTask.id);
      deleteTodoMutation.mutate(selectedTask.id);
      setDeleteDialogOpen(false);
      onDeleteTask?.(selectedTask);
    }
  }, [selectedTask, deleteTaskFromStore, deleteTodoMutation, onDeleteTask]);

  return {
    editDialogOpen,
    setEditDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    createDialogOpen,
    setCreateDialogOpen,
    selectedTask,
    createTaskStatus,
    handleEditTask,
    handleDeleteTask,
    handleDuplicateTask,
    handleAddTask,
    handleCreateTask,
    handleSaveTask,
    handleConfirmDelete,
  };
}

export function useTasksWithRows(tasks: Task[], weekDays: Date[]) {
  return useMemo(() => {
    if (!tasks || tasks.length === 0) return { tasks: [], maxRows: 0 };

    type TaskWithDatesNoRow = Omit<TaskWithDates, "row">;

    // Ensure we have a good mix of priorities in the 8 displayed tasks
    const selectedTasks: Task[] = [];
    const priorityGroups = { high: [] as Task[], medium: [] as Task[], low: [] as Task[] };

    // Group tasks by priority - collect ALL tasks of each priority
    tasks.forEach((task) => {
      const priority = (task.priority || "low") as TaskPriority;
      if (priorityGroups[priority]) {
        priorityGroups[priority].push(task);
      }
    });

    // Take up to 3 from each priority group to ensure a good visual mix
    selectedTasks.push(
      ...priorityGroups.high.slice(0, 3),
      ...priorityGroups.medium.slice(0, 3),
      ...priorityGroups.low.slice(0, 3)
    );

    // If we don't have enough, fill with remaining tasks
    if (selectedTasks.length < 8) {
      const remaining = tasks.filter((t) => !selectedTasks.includes(t));
      selectedTasks.push(...remaining.slice(0, 8 - selectedTasks.length));
    }

    const tasksWithPositions: TaskWithDatesNoRow[] = selectedTasks
      .slice(0, 8)
      .map((task: Task, index: number) => {
        const startDay = task.id % 7;
        const duration = (task.id % 3) + 1;
        const start = new Date(weekDays[startDay]);
        const end = new Date(start);
        end.setDate(start.getDate() + duration);

        return {
          ...task,
          description: task.description || taskDescriptions[index % taskDescriptions.length],
          startDate: start,
          endDate: end,
          startDay,
          duration,
        };
      });

    const rows: TaskWithDates[][] = [];
    const tasksWithRows: TaskWithDates[] = [];

    tasksWithPositions.forEach((task) => {
      let assignedRow = -1;

      for (let i = 0; i < rows.length; i++) {
        const rowTasks = rows[i];
        const hasOverlap = rowTasks.some((existingTask) => tasksOverlap(task, existingTask));

        if (!hasOverlap) {
          assignedRow = i;
          break;
        }
      }

      if (assignedRow === -1) {
        assignedRow = rows.length;
        rows.push([]);
      }

      const taskWithRow = { ...task, row: assignedRow + 1 };
      rows[assignedRow].push(taskWithRow);
      tasksWithRows.push(taskWithRow);
    });

    return { tasks: tasksWithRows, maxRows: rows.length };
  }, [tasks, weekDays]);
}
