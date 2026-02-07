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
import { Clock, Globe, MessageSquare, Plus, Share2, Star } from "lucide-react";
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
    <header className="border-b bg-white">
      <div className="flex h-14 items-center justify-between px-4 gap-4">
        <div className="flex items-center ">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 font-semibold">
            <Plus className="h-4 w-4" />
          </Button>

          <div className="h-4 w-px bg-gray-300" />

          {currentPage && (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="flex items-center gap-2 pl-2 text-gray-500 font-semibold"
                  >
                    <Globe className="h-4 w-4" />
                    <span>{pageCategory}</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-gray-600">
                    {currentPage.label}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </div>

        <div className="flex items-center gap-2 font-bold">
          <Button variant="outline" size="icon" className="h-8 w-8 text-gray-800 ">
            <Star className="h-4 w-4 " />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 text-gray-800">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <div className="h-4 w-px bg-gray-300" />
          <Button variant="outline" size="icon" className="h-8 w-8 text-gray-800">
            <Clock className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-2 text-gray-800">
            <Share2 className="h-3 w-3" />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
