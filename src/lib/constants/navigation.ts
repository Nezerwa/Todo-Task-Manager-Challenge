import {
  Search,
  Sparkles,
  Inbox,
  Calendar,
  Settings,
  FileText,
  Wind,
  Box,
  Palette,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: string;
}

export interface PageItem {
  icon: LucideIcon;
  label: string;
  href: string;
  color: string;
}

export const mainNavItems: NavItem[] = [
  {
    icon: Search,
    label: "Search",
    href: "/search",
  },
  {
    icon: Sparkles,
    label: "Kla AI",
    href: "/kla-ai",
  },
  {
    icon: Inbox,
    label: "Inbox",
    href: "/inbox",
    badge: "New",
  },
  {
    icon: Calendar,
    label: "Calendar",
    href: "/calendar",
  },
  {
    icon: Settings,
    label: "Settings & Preferences",
    href: "/settings",
  },
];

export const sharedPages: PageItem[] = [
  {
    icon: FileText,
    label: "HR Tasks Hub",
    href: "/hr-tasks",
    color: "text-red-500",
  },
  {
    icon: Wind,
    label: "Windah Comp",
    href: "/windah",
    color: "text-green-500",
  },
  {
    icon: Box,
    label: "NoSpace Dev",
    href: "/nospace",
    color: "text-yellow-500",
  },
];

export const privatePages: PageItem[] = [
  {
    icon: Palette,
    label: "Dribble Portfolio",
    href: "/dribble",
    color: "text-purple-500",
  },
];
