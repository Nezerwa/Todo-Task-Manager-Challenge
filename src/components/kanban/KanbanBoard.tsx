import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { KanbanColumn } from "./KanbanColumn";
import { TaskEditDialog } from "./TaskEditDialog";
import { TaskDeleteDialog } from "./TaskDeleteDialog";
import { TaskCreateDialog } from "./TaskCreateDialog";
import { useTaskStore } from "@/stores/taskStore";
import { useTodos, useDeleteTodo, useCreateTodo, useUpdateTodo } from "@/hooks/useTasks";
import type { Task, TaskStatus } from "@/types/task";
import profile1 from "@/assets/Profil1.jpg";
import profile2 from "@/assets/profile2.jpg";
import profile3 from "@/assets/profile3.jpg";

const mockUsers = [
  { id: 1, name: "Eligrand Nezerwa", image: profile1 },
  { id: 2, name: "Patrick Kelly", image: profile2 },
  { id: 3, name: "Alfred Niyonzima", image: profile3 },
];

export function KanbanBoard() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useTodos();
  const { tasks, setTasks, getTasksByStatus, deleteTask, addTask, updateTask } = useTaskStore();
  const deleteTodoMutation = useDeleteTodo();
  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();

  const columns = [
    {
      title: t("status.todo"),
      status: "todo" as TaskStatus,
    },
    {
      title: t("status.in_progress"),
      status: "in-progress" as TaskStatus,
    },
    {
      title: t("status.in_review"),
      status: "review" as TaskStatus,
    },
    {
      title: t("status.completed"),
      status: "done" as TaskStatus,
    },
  ];

  // Dialog state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [createTaskStatus, setCreateTaskStatus] = useState<TaskStatus>("todo");

  useEffect(() => {
    if (tasks.length > 0) {
      return;
    }

    if (data?.todos) {
      const transformedTasks = data.todos.map((task, index) => {
        const statusIndex = index % 4;
        const statuses: TaskStatus[] = ["todo", "in-progress", "review", "done"];

        const userCount = Math.floor(Math.random() * 3) + 1;
        const assignedUsers = mockUsers.slice(0, userCount);

        return {
          ...task,
          status: statuses[statusIndex],
          description: "Hardcoded description for demonstration since it is not available in API",
          date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          checklistProgress:
            Math.random() > 0.5
              ? {
                  completed: Math.floor(Math.random() * 4),
                  total: Math.floor(Math.random() * 6) + 4,
                }
              : undefined,
          commentsCount: Math.floor(Math.random() * 10),
          attachmentsCount: Math.floor(Math.random() * 5),
          assignedUsers,
        };
      });
      setTasks(transformedTasks);
    }
  }, [data, setTasks, tasks.length]);

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setEditDialogOpen(true);
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

  const handleDeleteTask = (id: number) => {
    const task = [
      ...getTasksByStatus("todo"),
      ...getTasksByStatus("in-progress"),
      ...getTasksByStatus("review"),
      ...getTasksByStatus("done"),
    ].find((t) => t.id === id);
    if (task) {
      setSelectedTask(task);
      setDeleteDialogOpen(true);
    }
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

  const handleDuplicateTask = (task: Task) => {
    const newTask = {
      todo: `${task.todo} (Copy)`,
      completed: false,
      userId: task.userId,
    };

    createTodoMutation.mutate(newTask, {
      onSuccess: (response) => {
        addTask({
          ...task,
          id: response.id,
          todo: newTask.todo,
        });
      },
    });
  };

  const handleAddTask = (status: TaskStatus) => {
    setCreateTaskStatus(status);
    setCreateDialogOpen(true);
  };

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
        addTask({
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 dark:text-gray-400">{t("kanbanBoard.loadingTasks")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500 dark:text-red-400">{t("kanbanBoard.errorLoadingTasks")}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-6 h-full overflow-x-auto px-6 py-4 bg-gray-100 dark:bg-gray-900">
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={getTasksByStatus(column.status)}
            onAddTask={() => handleAddTask(column.status)}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onDuplicateTask={handleDuplicateTask}
          />
        ))}
      </div>

      <TaskEditDialog
        task={selectedTask}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleSaveTask}
        availableUsers={mockUsers}
      />

      <TaskDeleteDialog
        task={selectedTask}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
      />

      <TaskCreateDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSave={handleCreateTask}
        defaultStatus={createTaskStatus}
        availableUsers={mockUsers}
      />
    </>
  );
}
