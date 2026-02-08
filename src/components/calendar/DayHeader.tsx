import { formatDayName } from "./calendar.utils";

interface DayHeaderProps {
  day: Date;
}

export function DayHeader({ day }: DayHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900">
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {day.getDate()}
        </span>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
        {formatDayName(day)}
      </div>
    </div>
  );
}
