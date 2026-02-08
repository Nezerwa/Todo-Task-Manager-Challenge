import {
  MessageCircle,
  Paperclip,
  MoreHorizontal,
  Pencil,
  Trash2,
  Copy,
  CheckSquare,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Task } from "@/types/task";
import { format } from "date-fns";

interface KanbanCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (id: number) => void;
  onDuplicate?: (task: Task) => void;
}

export function KanbanCard({ task, onEdit, onDelete, onDuplicate }: KanbanCardProps) {
  const { t } = useTranslation();

  return (
    <div
      className="group relative rounded-lg border bg-white dark:bg-gray-900 dark:border-gray-800 p-4 shadow-sm hover:shadow-md dark:shadow-gray-950/50 dark:hover:shadow-gray-950 transition-shadow cursor-pointer"
      onClick={() => onEdit?.(task)}
    >
      {task.date && (
        <div className="flex items-center gap-2 mb-3">
          <div className="h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-600" />
          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            {format(new Date(task.date), "MMM d, yyyy")}
          </span>
        </div>
      )}

      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1 line-clamp-2">
        {task.todo}
      </h3>

      {task.description && (
        <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {task.checklistProgress && (
        <>
          <div className="border-t border-gray-200 dark:border-gray-800 my-3" />
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <CheckSquare className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {t("taskCard.checklist")}
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {task.checklistProgress.completed}/{task.checklistProgress.total}
              </span>
            </div>
            <div className="flex gap-0.5 w-full">
              {Array.from({ length: task.checklistProgress.total }).map((_, index) => (
                <div
                  key={index}
                  className="h-1.5 flex-1 rounded-full"
                  style={{
                    backgroundColor:
                      index < task.checklistProgress!.completed ? "#10B981" : "#E5E7EB",
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex items-center justify-between">
        {/* Counts */}
        <div className="flex items-center gap-2">
          {task.commentsCount !== undefined && task.commentsCount > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-800/50 rounded text-gray-600 dark:text-gray-400 text-xs">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{task.commentsCount}</span>
            </div>
          )}
          {task.attachmentsCount !== undefined && task.attachmentsCount > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-800/50 rounded text-gray-600 dark:text-gray-400 text-xs">
              <Paperclip className="h-3.5 w-3.5" />
              <span>{task.attachmentsCount}</span>
            </div>
          )}
        </div>

        {task.assignedUsers && task.assignedUsers.length > 0 && (
          <div className="flex -space-x-2">
            {task.assignedUsers.slice(0, 3).map((user) => (
              <Avatar
                key={user.id}
                className="h-6 w-6 border-2 border-white dark:border-gray-900 rounded-md"
              >
                <AvatarImage src={user.image} alt={user.name} className="object-cover" />
                <AvatarFallback className="text-[10px] bg-purple-600 dark:bg-purple-500 text-white">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(task);
            }}
            className="cursor-pointer"
          >
            <Pencil className="mr-2 h-4 w-4" />
            <span>{t("common.edit")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate?.(task);
            }}
            className="cursor-pointer"
          >
            <Copy className="mr-2 h-4 w-4" />
            <span>{t("common.duplicate")}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(task.id);
            }}
            className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>{t("common.delete")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
