import {
  MoreHorizontal,
  LayoutGrid,
  List,
  Calendar,
  Search,
  ListFilter,
  ArrowDownWideNarrow,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profile1 from "@/assets/Profil1.jpg";
import profile2 from "@/assets/profile2.jpg";
import profile3 from "@/assets/profile3.jpg";
import type { ViewType } from "@/pages/HRTasksPage";

const teamMembers = [
  { id: 1, name: "Eligrand Nezerwa", image: profile1 },
  { id: 2, name: "Patrick Kelly", image: profile2 },
  { id: 3, name: "Alfred Niyonzima", image: profile3 },
];

interface ViewToolbarProps {
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function ViewToolbar({ activeView, onViewChange }: ViewToolbarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-3 md:px-6">
      <div className="flex items-center gap-2 shrink-0">
        <Button variant="outline" size="icon" className="h-8 w-8 text-gray-600 dark:text-gray-400">
          <MoreHorizontal className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className={`h-8 gap-2 font-semibold ${
              activeView === "kanban"
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-300 dark:text-gray-600"
            }`}
            onClick={() => onViewChange("kanban")}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">{t("viewToolbar.kanban")}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`h-8 gap-2 font-semibold ${
              activeView === "list"
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-300 dark:text-gray-600"
            }`}
            onClick={() => onViewChange("list")}
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">{t("viewToolbar.list")}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`h-8 gap-2 font-semibold ${
              activeView === "calendar"
                ? "text-gray-900 dark:text-gray-100"
                : "text-gray-300 dark:text-gray-600"
            }`}
            onClick={() => onViewChange("calendar")}
          >
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">{t("viewToolbar.calendar")}</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3 flex-wrap">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-600 dark:text-gray-400 font-bold" />
          <Input
            placeholder={t("viewToolbar.searchPlaceholder")}
            className="h-8 w-48 pl-9 pr-16 text-sm md:w-64"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-600 dark:text-gray-400 font-semibold bg-gray-100 dark:bg-gray-800 p-2 rounded">
            ⌘F
          </kbd>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 text-gray-600 dark:text-gray-400 font-semibold"
        >
          <ListFilter className="h-4 w-4" />
          <span className="hidden lg:inline">{t("common.filter")}</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 text-gray-600 dark:text-gray-400 font-semibold"
        >
          <ArrowDownWideNarrow className="h-4 w-4" />
          <span className="hidden lg:inline">{t("common.sort")}</span>
        </Button>
        <div className="flex -space-x-2">
          {teamMembers.map((member) => (
            <Avatar
              key={member.id}
              className="h-8 w-8 border-2 border-white dark:border-gray-800 rounded-md"
            >
              <AvatarImage src={member.image} alt={member.name} className="object-cover" />
              <AvatarFallback className="text-xs bg-purple-600 dark:bg-purple-500 text-white">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
    </div>
  );
}
