import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { PageHeader } from "@/components/PageHeader";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

function RootLayoutContent() {
  const { open, isMobile } = useSidebar();

  return (
    <>
      <AppSidebar />
      <main className="flex-1 w-full flex flex-col">
        {(isMobile || !open) && (
          <div className="border-b p-2 z-10 bg-white dark:bg-gray-950">
            <SidebarTrigger />
          </div>
        )}
        <PageHeader />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export function RootLayout() {
  return (
    <SidebarProvider>
      <RootLayoutContent />
    </SidebarProvider>
  );
}
