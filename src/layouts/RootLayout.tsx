import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

function RootLayoutContent() {
  const { open } = useSidebar();

  return (
    <>
      <AppSidebar />
      <main className="flex-1 w-full">
        {!open && (
          <div className="border-b p-2">
            <SidebarTrigger />
          </div>
        )}
        <Outlet />
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
