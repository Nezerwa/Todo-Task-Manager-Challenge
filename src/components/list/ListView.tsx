import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { type RowSelectionState } from "@tanstack/react-table";
import { useTaskStore } from "@/stores/taskStore";
import { TaskEditDialog } from "@/components/kanban/TaskEditDialog";
import { TaskDeleteDialog } from "@/components/kanban/TaskDeleteDialog";
import { TaskCreateDialog } from "@/components/kanban/TaskCreateDialog";
import type { Task, TaskStatus } from "@/types/task";
import { statusOrder } from "@/components/list/listViewConstants";
import { getListViewColumns } from "@/components/list/listViewColumns";
import { ListViewTable } from "@/components/list/ListViewTable";
import { useTaskActions, mockUsers } from "@/components/list/useTaskActions";

interface ListViewProps {
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (id: number) => void;
  onDuplicateTask?: (task: Task) => void;
}

export function ListView({ onEditTask, onDeleteTask, onDuplicateTask }: ListViewProps) {
  const { t } = useTranslation();
  const { tasks } = useTaskStore();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const {
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
  } = useTaskActions({ onEditTask, onDeleteTask, onDuplicateTask });

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      const aStatus = (a.status || "todo") as TaskStatus;
      const bStatus = (b.status || "todo") as TaskStatus;
      return (statusOrder[aStatus] || 999) - (statusOrder[bStatus] || 999);
    });
  }, [tasks]);

  const columns = useMemo(
    () =>
      getListViewColumns({
        onEdit: handleEditTask,
        onDelete: handleDeleteTask,
        onDuplicate: handleDuplicateTask,
        t,
      }),
    [handleEditTask, handleDeleteTask, handleDuplicateTask, t]
  );

  return (
    <div className="w-full">
      <ListViewTable
        sortedTasks={sortedTasks}
        columns={columns}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        onAddTask={handleAddTask}
      />

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
