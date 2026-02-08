import purpleGradient from "@/assets/purple gradient.jpg";
import { Button } from "@/components/ui/button";
import { LoomIcon } from "@/components/icons/LoomIcon";
import { useTranslation } from "react-i18next";

export function SidebarUpgradeCard() {
  const { t } = useTranslation();
  return (
    <div className="overflow-hidden rounded-lg bg-white">
      <div className="relative h-20">
        <img
          src={purpleGradient}
          alt="gradient background"
          className="h-full w-full object-cover"
        />
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600 backdrop-blur-sm">
            <LoomIcon className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
      <div className="px-4 pt-8 pb-4">
        <h3 className="mb-1 text-center text-sm font-semibold text-gray-900">
          {t("upgradeCard.title")}
        </h3>
        <p className="mb-3 text-center text-xs text-gray-600">{t("upgradeCard.description")}</p>
        <Button className="w-full bg-slate-800 text-white hover:bg-slate-700" size="sm">
          {t("upgradeCard.button")}
        </Button>
      </div>
    </div>
  );
}
