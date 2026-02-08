import { Plus, ClipboardList, Loader2, Flame, CheckCircle2 } from "lucide-react";
import { KanbanCard } from "./KanbanCard";
import type { Task, TaskStatus } from "@/types/task";

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onAddTask?: () => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (id: number) => void;
  onDuplicateTask?: (task: Task) => void;
}

const statusIcons = {
  todo: { icon: ClipboardList, color: "text-red-500", bgColor: "bg-red-50" },
  "in-progress": { icon: Loader2, color: "text-blue-500", bgColor: "bg-blue-50" },
  review: { icon: Flame, color: "text-orange-500", bgColor: "bg-orange-50" },
  done: { icon: CheckCircle2, color: "text-green-500", bgColor: "bg-green-50" },
};

export function KanbanColumn({
  title,
  status,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onDuplicateTask,
}: KanbanColumnProps) {
  const statusConfig = statusIcons[status];
  const StatusIcon = statusConfig.icon;

  return (
    <div className="flex flex-col min-w-70 flex-1 px-2">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-950">
        <button
          className="flex items-center gap-2 h-8 text-gray-700 dark:text-gray-300 font-semibold hover:opacity-80"
          onClick={onAddTask}
        >
          <Plus className="h-4 w-4" />
          <span>{title}</span>
        </button>
        <div
          className={`flex items-center gap-1.5 px-2 py-1 rounded ${statusConfig.bgColor} dark:bg-gray-800`}
        >
          <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
            {tasks.length}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3 overflow-y-auto pr-2">
        {tasks.map((task) => (
          <KanbanCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onDuplicate={onDuplicateTask}
          />
        ))}
      </div>
    </div>
  );
}
