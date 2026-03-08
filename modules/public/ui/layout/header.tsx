"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeModeToggle } from "@/components/custom/theme-mode-toggle";
import { SearchInput } from "@/modules/public/ui/components/search-input";
import { NotificationDropdown } from "@/modules/admin/ui/components/notification-dropdown";

export default function Header() {
  return (
    <header className="sticky top-4 z-50 mx-4 mt-4 flex h-16 shrink-0 items-center justify-between gap-2 rounded-xl border bg-background/95 px-6 shadow-md backdrop-blur supports-backdrop-filter:bg-background/60 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <span className="font-bold text-base">
          {" "}
          Kumaha damang, Warga Bdg! 👋
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex">
          <SearchInput />
        </div>
        <NotificationDropdown />
        <ThemeModeToggle />
      </div>
    </header>
  );
}
