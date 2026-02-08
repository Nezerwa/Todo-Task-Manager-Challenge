import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, ChevronDown, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatMonthYear } from "./calendar.utils";

interface CalendarHeaderProps {
  currentDate: Date;
  viewMode: "week" | "month";
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onViewModeChange: (mode: "week" | "month") => void;
  onAddTask: () => void;
}

export function CalendarHeader({
  currentDate,
  viewMode,
  onPreviousWeek,
  onNextWeek,
  onViewModeChange,
  onAddTask,
}: CalendarHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-800">
      <div className="flex items-center gap-4 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg">
        <button
          onClick={onPreviousWeek}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {formatMonthYear(currentDate)}
        </h2>
        <button
          onClick={onNextWeek}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              {viewMode === "week" ? t("calendarView.week") : t("calendarView.month")}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onViewModeChange("week")}>
              {t("calendarView.week")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewModeChange("month")}>
              {t("calendarView.month")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          size="sm"
          className="bg-slate-800 hover:bg-slate-700 text-white gap-2"
          onClick={onAddTask}
        >
          <Plus className="w-4 h-4" />
          {t("calendarView.newTask")}
        </Button>

        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <MoreHorizontal className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
}
