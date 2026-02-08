import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ViewToolbar } from "@/components/ViewToolbar";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { ListView } from "@/components/list/ListView";
import { CalendarView } from "@/components/calendar/CalendarView";

export type ViewType = "kanban" | "list" | "calendar";

export function HRTasksPage() {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState<ViewType>("kanban");

  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {t("hrTasks.title")}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
          {t("hrTasks.subtitle")}
        </p>
      </div>

      <ViewToolbar activeView={activeView} onViewChange={setActiveView} />

      <div className="flex-1 overflow-hidden">
        {activeView === "kanban" && <KanbanBoard />}
        {activeView === "list" && <ListView />}
        {activeView === "calendar" && <CalendarView />}
      </div>
    </div>
  );
}
