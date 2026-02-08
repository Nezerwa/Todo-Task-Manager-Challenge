import { useState, useCallback } from "react";
import { useTaskStore } from "@/stores/taskStore";
import { useDeleteTodo, useCreateTodo, useUpdateTodo } from "@/hooks/useTasks";
import type { Task, TaskStatus } from "@/types/task";
import profile1 from "@/assets/Profil1.jpg";
import profile2 from "@/assets/profile2.jpg";
import profile3 from "@/assets/profile3.jpg";

export const mockUsers = [
  { id: 1, name: "Eligrand Nezerwa", image: profile1 },
  { id: 2, name: "Patrick Kelly", image: profile2 },
  { id: 3, name: "Alfred Niyonzima", image: profile3 },
];

interface UseTaskActionsProps {
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (id: number) => void;
  onDuplicateTask?: (task: Task) => void;
}

export function useTaskActions({ onEditTask, onDeleteTask, onDuplicateTask }: UseTaskActionsProps) {
  const { tasks, updateTask, deleteTask } = useTaskStore();
  const deleteTodoMutation = useDeleteTodo();
  const updateTodoMutation = useUpdateTodo();
  const createTodoMutation = useCreateTodo();

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

  const handleDeleteTask = useCallback(
    (id: number) => {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        setSelectedTask(task);
        setDeleteDialogOpen(true);
        onDeleteTask?.(id);
      }
    },
    [tasks, onDeleteTask]
  );

  const handleDuplicateTask = useCallback(
    (task: Task) => {
      const newTask = {
        todo: `${task.todo} (Copy)`,
        completed: false,
        userId: task.userId,
      };

      createTodoMutation.mutate(newTask, {
        onSuccess: (response) => {
          useTaskStore.getState().addTask({
            ...task,
            id: response.id,
            todo: newTask.todo,
          });
        },
      });
      onDuplicateTask?.(task);
    },
    [createTodoMutation, onDuplicateTask]
  );

  const handleAddTask = useCallback((status: TaskStatus) => {
    setCreateTaskStatus(status);
    setCreateDialogOpen(true);
  }, []);

  const handleCreateTask = (taskData: {
    todo: string;
    status: TaskStatus;
    description: string;
    assignedUsers: typeof mockUsers;
  }) => {
    const newTaskPayload = {
      todo: taskData.todo,
      completed: false,
      userId: 1,
    };

    createTodoMutation.mutate(newTaskPayload, {
      onSuccess: (response) => {
        useTaskStore.getState().addTask({
          id: response.id,
          todo: taskData.todo,
          completed: false,
          userId: 1,
          status: taskData.status,
          description: taskData.description,
          date: new Date().toISOString(),
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          checklistProgress: undefined,
          commentsCount: 0,
          attachmentsCount: 0,
          assignedUsers: taskData.assignedUsers,
        });
      },
    });
  };

  const handleSaveTask = (task: Task) => {
    updateTodoMutation.mutate(
      { id: task.id, data: { todo: task.todo, completed: task.completed } },
      {
        onSuccess: () => {
          updateTask(task.id, task);
        },
      }
    );
  };

  const handleConfirmDelete = () => {
    if (selectedTask) {
      deleteTodoMutation.mutate(selectedTask.id, {
        onSuccess: () => {
          deleteTask(selectedTask.id);
          setDeleteDialogOpen(false);
          setSelectedTask(null);
        },
      });
    }
  };

  return {
    selectedTask,
    editDialogOpen,
    setEditDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    createDialogOpen,
    setCreateDialogOpen,
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
