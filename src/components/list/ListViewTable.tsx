import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  flexRender,
  type ColumnDef,
  type RowSelectionState,
  type OnChangeFn,
} from "@tanstack/react-table";
import { Plus, ClipboardList, Loader2, Flame, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Task, TaskStatus } from "@/types/task";
import { statusLabels } from "./listViewConstants";

const statusIcons = {
  todo: { icon: ClipboardList, color: "text-red-500", bgColor: "bg-red-50" },
  "in-progress": { icon: Loader2, color: "text-blue-500", bgColor: "bg-blue-50" },
  review: { icon: Flame, color: "text-orange-500", bgColor: "bg-orange-50" },
  done: { icon: CheckCircle2, color: "text-green-500", bgColor: "bg-green-50" },
};

interface ListViewTableProps {
  sortedTasks: Task[];
  columns: ColumnDef<Task>[];
  rowSelection: RowSelectionState;
  onRowSelectionChange: OnChangeFn<RowSelectionState>;
  onAddTask: (status: TaskStatus) => void;
}

export function ListViewTable({
  sortedTasks,
  columns,
  rowSelection,
  onRowSelectionChange,
  onAddTask,
}: ListViewTableProps) {
  const table = useReactTable({
    data: sortedTasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onRowSelectionChange,
    state: {
      rowSelection,
    },
  });

  const groupedTasks = useMemo(() => {
    const groups: Record<string, Task[]> = {
      todo: [],
      "in-progress": [],
      review: [],
      done: [],
    };

    sortedTasks.forEach((task) => {
      const status = task.status as string;
      if (groups[status]) {
        groups[status].push(task);
      }
    });

    return groups;
  }, [sortedTasks]);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950">
      <div className="overflow-auto flex-1">
        <table className="w-full">
          <tbody>
            {Object.entries(groupedTasks).map(([status, tasks]) => {
              const count = tasks.length;
              const statusConfig = statusIcons[status as TaskStatus];
              const StatusIcon = statusConfig.icon;

              return (
                <tr key={`group-${status}`} className="bg-white dark:bg-gray-950">
                  <td colSpan={columns.length} className="px-0 py-0">
                    <div className="flex items-center justify-between px-6 py-3 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-gray-200 dark:hover:bg-gray-800"
                          onClick={() => onAddTask(status as TaskStatus)}
                        >
                          <Plus className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </Button>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          {statusLabels[status as TaskStatus]}
                        </span>
                        <div
                          className={`flex items-center gap-1.5 px-2 py-1 rounded ${statusConfig.bgColor} dark:bg-gray-800`}
                        >
                          <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
                          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                            {count}
                          </span>
                        </div>
                      </div>
                    </div>

                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-800">
                        <tr>
                          {table.getFlatHeaders().map((header, headerIndex) => (
                            <th
                              key={header.id}
                              className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider"
                            >
                              <div className="flex items-center gap-4">
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(header.column.columnDef.header, header.getContext())}
                                {headerIndex < table.getFlatHeaders().length - 1 && (
                                  <div className="h-4 w-px bg-gray-300 dark:bg-gray-700" />
                                )}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {tasks.map((task) => {
                          const rowIndex = sortedTasks.findIndex((t) => t.id === task.id);
                          const row = table.getRowModel().rows[rowIndex];

                          if (!row) return null;

                          return (
                            <tr
                              key={task.id}
                              className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                            >
                              {row.getVisibleCells().map((cell) => (
                                <td
                                  key={cell.id}
                                  className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap"
                                >
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
