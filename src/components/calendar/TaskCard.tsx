import { useTranslation } from "react-i18next";
import { MoreHorizontal } from "lucide-react";
import type { Task, TaskPriority } from "@/types/task";
import type { TaskWithDates } from "./calendar.constants";
import { priorityColors } from "./calendar.constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskCardProps {
  task: TaskWithDates;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onDuplicate: (task: Task) => void;
}

export function TaskCard({ task, onEdit, onDelete, onDuplicate }: TaskCardProps) {
  const { t } = useTranslation();
  const priority = (task.priority || "low") as TaskPriority;
  const colors = priorityColors[priority];

  return (
    <div
      className="relative"
      style={{
        gridColumn: `${task.startDay + 1} / span ${Math.min(task.duration + 1, 7 - task.startDay)}`,
        gridRow: task.row,
      }}
    >
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-3 hover:shadow-lg transition-shadow cursor-pointer relative overflow-hidden h-full">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-2 h-2 rounded-full shrink-0 ${colors.dot}`} />
          <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
            {task.startDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}{" "}
            -{" "}
            {task.endDate.getMonth() === task.startDate.getMonth()
              ? task.endDate.getDate()
              : task.endDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
            {", "}
            {task.endDate.getFullYear()}
          </span>
        </div>

        <div className="absolute top-2 right-2 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                onClick={(e) => e.stopPropagation()}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              >
                <MoreHorizontal className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                }}
              >
                {t("common.edit")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate(task);
                }}
              >
                {t("common.duplicate")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task);
                }}
                className="text-red-600"
              >
                {t("common.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mb-2">
          <span
            className={`inline-block px-2 py-0.5 text-xs font-semibold rounded ${colors.badge}`}
          >
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        </div>

        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1.5 line-clamp-1 pr-6">
          {task.todo}
        </h4>

        <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold line-clamp-2">
          {task.description || t("calendarView.noDescription")}
        </p>

        <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-lg ${colors.bar}`} />
      </div>
    </div>
  );
}
