import { Plus, MoreHorizontal } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import profileImage from "@/assets/profile.jpg";

export function SidebarAccountSection() {
  return (
    <SidebarGroup>
      <div className="flex items-center justify-between px-3 py-2">
        <SidebarGroupLabel>Accounts</SidebarGroupLabel>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/account" className="flex items-center gap-2">
                <Avatar className="h-6 w-6 rounded-sm bg-purple-600">
                  <AvatarImage src={profileImage} className="rounded-sm" />
                  <AvatarFallback className="bg-purple-600 text-white text-xs rounded-sm">
                    E
                  </AvatarFallback>
                </Avatar>
                <span>Eligrand</span>
                <Button variant="ghost" size="icon" className="ml-auto h-6 w-6">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
