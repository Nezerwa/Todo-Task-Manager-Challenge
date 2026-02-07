import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarNavSection } from "@/components/sidebar/SidebarNavSection";
import { SidebarPagesSection } from "@/components/sidebar/SidebarPagesSection";
import { SidebarAccountSection } from "@/components/sidebar/SidebarAccountSection";
import { SidebarUpgradeCard } from "@/components/sidebar/SidebarUpgradeCard";
import { LoomIcon } from "@/components/icons/LoomIcon";
import { mainNavItems, sharedPages, privatePages } from "@/lib/constants/navigation";
import { ChevronsLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600">
              <LoomIcon className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Klaboard</span>
              <div className="flex items-center gap-1 text-xs text-purple-600 font-bold">
                <span>●</span>
                <span>free-trial</span>
              </div>
            </div>
          </div>
          <div className="bg-white">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleSidebar}>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarNavSection items={mainNavItems} />
        <SidebarPagesSection title="Shared Pages" pages={sharedPages} />
        <SidebarPagesSection title="Private Pages" pages={privatePages} />
        <SidebarAccountSection />
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarUpgradeCard />
      </SidebarFooter>
    </Sidebar>
  );
}
