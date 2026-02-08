import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTodos } from "@/hooks/useTasks";
import { useTaskStore } from "@/stores/taskStore";
import type { Task } from "@/types/task";
import { TaskCreateDialog } from "@/components/kanban/TaskCreateDialog";
import { TaskEditDialog } from "@/components/kanban/TaskEditDialog";
import { TaskDeleteDialog } from "@/components/kanban/TaskDeleteDialog";
import { mockUsers } from "./calendar.constants";
import {
  useTaskPopulation,
  useWeekNavigation,
  useTaskHandlers,
  useTasksWithRows,
} from "./calendar.hooks";
import { CalendarHeader } from "./CalendarHeader";
import { DayHeader } from "./DayHeader";
import { TaskCard } from "./TaskCard";

interface CalendarViewProps {
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (task: Task) => void;
  onDuplicateTask?: (task: Task) => void;
}

export function CalendarView({ onEditTask, onDeleteTask, onDuplicateTask }: CalendarViewProps) {
  const { t } = useTranslation();
  const { data: todosResponse, isLoading, error } = useTodos();
  const { tasks, setTasks } = useTaskStore();
  const [viewMode, setViewMode] = useState<"week" | "month">("week");

  // Custom hooks for logic separation
  useTaskPopulation(todosResponse, tasks, setTasks);
  const { currentDate, weekDays, goToPreviousWeek, goToNextWeek } = useWeekNavigation();
  const tasksWithDates = useTasksWithRows(tasks, weekDays);
  
  const {
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
  } = useTaskHandlers(onEditTask, onDeleteTask, onDuplicateTask);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">{t("common.loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">{t("common.error")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950">
      <CalendarHeader
        currentDate={currentDate}
        viewMode={viewMode}
        onPreviousWeek={goToPreviousWeek}
        onNextWeek={goToNextWeek}
        onViewModeChange={setViewMode}
        onAddTask={handleAddTask}
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-7 gap-6">
          {weekDays.map((day, index) => (
            <DayHeader key={index} day={day} />
          ))}

          <div
            className="col-span-7 grid grid-cols-7 gap-x-6 mt-6"
            style={{
              gridTemplateRows: `repeat(${tasksWithDates.maxRows}, 160px)`,
              rowGap: "16px",
            }}
          >
            {tasksWithDates.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                onDuplicate={handleDuplicateTask}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedTask && (
        <>
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
        </>
      )}

      <TaskCreateDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSave={handleCreateTask}
        defaultStatus={createTaskStatus}
        availableUsers={mockUsers}
      />
    </div>
  );
}
