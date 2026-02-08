import { type ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Copy,
  Paperclip,
  Calendar,
  Users,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import type { Task } from "@/types/task";
import { format } from "date-fns";
import { statusColors } from "./listViewConstants";

interface GetColumnsParams {
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onDuplicate: (task: Task) => void;
  t: (key: string) => string;
}

export const getListViewColumns = ({
  onEdit,
  onDelete,
  onDuplicate,
  t,
}: GetColumnsParams): ColumnDef<Task>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "todo",
    header: () => (
      <div className="flex items-center gap-2">
        <span>{t("listView.task")}</span>
      </div>
    ),
    cell: ({ row }) => (
      <div className="font-medium text-gray-900 dark:text-gray-100 truncate max-w-xs">
        {row.original.todo}
      </div>
    ),
  },
  {
    id: "dates",
    header: () => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        <span>{t("listView.dueDate")}</span>
      </div>
    ),
    cell: ({ row }) => {
      const task = row.original;
      if (task.date && task.dueDate) {
        return (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {format(new Date(task.date), "MMM d, yyyy")} -{" "}
            {format(new Date(task.dueDate), "MMM d, yyyy")}
          </div>
        );
      }
      return <span className="text-gray-400 dark:text-gray-600">-</span>;
    },
  },
  {
    id: "status",
    header: () => (
      <div className="flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        <span>{t("listView.priority")}</span>
      </div>
    ),
    cell: ({ row }) => {
      const priority = row.original.completed
        ? "Low"
        : row.original.checklistProgress
          ? row.original.checklistProgress.completed > row.original.checklistProgress.total / 2
            ? "Medium"
            : "High"
          : "High";

      return (
        <Badge
          className={`${statusColors[priority]} font-semibold border-0 px-5 py-1.5`}
          variant="secondary"
        >
          {t(`priority.${priority.toLowerCase()}`)}
        </Badge>
      );
    },
  },
  {
    id: "attachment",
    header: () => (
      <div className="flex items-center gap-2">
        <Paperclip className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        <span>{t("taskCard.attachments")}</span>
      </div>
    ),
    cell: ({ row }) => {
      const task = row.original;
      if (task.attachmentsCount && task.attachmentsCount > 0) {
        return (
          <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
            <Paperclip className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            <span>document_{task.id}.doc</span>
          </div>
        );
      }
      return <span className="text-gray-400 dark:text-gray-600">-</span>;
    },
  },
  {
    id: "people",
    header: () => (
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-gray-400 dark:text-gray-500" />
        <span>{t("listView.assignedTo")}</span>
      </div>
    ),
    cell: ({ row }) => {
      const task = row.original;
      if (task.assignedUsers && task.assignedUsers.length > 0) {
        return (
          <div className="flex -space-x-2">
            {task.assignedUsers.slice(0, 3).map((user) => (
              <Avatar
                key={user.id}
                className="h-7 w-7 border-2 border-white dark:border-gray-800 rounded-md"
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
        );
      }
      return <span className="text-gray-400 dark:text-gray-600">-</span>;
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => onEdit(row.original)} className="cursor-pointer">
            <Pencil className="mr-2 h-4 w-4" />
            <span>{t("common.edit")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDuplicate(row.original)} className="cursor-pointer">
            <Copy className="mr-2 h-4 w-4" />
            <span>{t("common.duplicate")}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onDelete(row.original.id)}
            className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>{t("common.delete")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
