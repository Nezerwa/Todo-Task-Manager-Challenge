import { ChevronDown, GripVertical } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { PageItem } from "@/lib/constants/navigation";

interface SidebarPagesSectionProps {
  title: string;
  pages: PageItem[];
  defaultOpen?: boolean;
}

export function SidebarPagesSection({
  title,
  pages,
  defaultOpen = true,
}: SidebarPagesSectionProps) {
  return (
    <SidebarGroup>
      <Collapsible defaultOpen={defaultOpen} className="group/collapsible">
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger className="flex w-full items-center justify-between">
            <span>{title}</span>
            <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {pages.map((page) => (
                <SidebarMenuItem key={page.label}>
                  <SidebarMenuButton
                    asChild
                    className="group/item hover:bg-white dark:hover:bg-gray-800 hover:px-3 hover:py-2"
                  >
                    <a href={page.href} className="flex items-center gap-2">
                      <GripVertical className="h-4 w-4 text-muted-foreground/40 group-hover/item:text-muted-foreground" />
                      <page.icon className={`h-4 w-4 ${page.color}`} />
                      <span>{page.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  );
}
