import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { privatePages, sharedPages } from "@/lib/constants/navigation";
import { Clock, Globe, MessageCircle, Plus, Share2, Star } from "lucide-react";
import { useLocation } from "react-router-dom";

export function PageHeader() {
  const location = useLocation();

  // Find current page from navigation
  const allPages = [...sharedPages, ...privatePages];
  const currentPage = allPages.find((page) => page.href === location.pathname);

  // Determine if it's a shared or private page
  const isSharedPage = sharedPages.some((page) => page.href === location.pathname);
  const pageCategory = isSharedPage ? "Shared Pages" : "Private Pages";

  return (
    <header className="border-b bg-white dark:bg-gray-950 dark:border-gray-800">
      <div className="flex h-14 items-center justify-between px-4 gap-2 md:gap-4">
        <div className="flex items-center min-w-0 flex-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 dark:text-gray-400 font-semibold shrink-0"
          >
            <Plus className="h-4 w-4" />
          </Button>

          <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 shrink-0" />

          {currentPage && (
            <Breadcrumb className="min-w-0 flex-1">
              <BreadcrumbList className="flex-nowrap">
                <BreadcrumbItem className="hidden sm:flex">
                  <BreadcrumbLink
                    href="/"
                    className="flex items-center gap-2 pl-2 text-gray-500 dark:text-gray-400 font-semibold"
                  >
                    <Globe className="h-4 w-4 shrink-0" />
                    <span className="truncate">{pageCategory}</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:flex" />
                <BreadcrumbItem className="min-w-0">
                  <BreadcrumbPage className="font-semibold text-gray-600 dark:text-gray-300 truncate">
                    {currentPage.label}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </div>

        <div className="flex items-center gap-1 md:gap-2 font-bold shrink-0">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 text-gray-800 dark:text-gray-200 hidden md:flex"
          >
            <Star className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 text-gray-800 dark:text-gray-200 hidden sm:flex"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block" />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 text-gray-800 dark:text-gray-200 hidden sm:flex"
          >
            <Clock className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-2 text-gray-800 dark:text-gray-200"
          >
            <Share2 className="h-3 w-3" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
