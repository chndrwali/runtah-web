"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { UserAvatarProfile } from "@/components/custom/user-avatar-profile";
import { navItems } from "@/modules/public/config";
import { useFilteredNavItems } from "@/hooks/use-nav";
import { ChevronRight, ChevronsDown, UserCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { Icons } from "@/components/custom/icons";
import { useCurrentUser } from "@/hooks/use-current-user";
import gsap from "gsap";
import { SignoutButton } from "@/modules/admin/ui/components/signout-button";
import { SidebarLogo } from "../components/sidebar-logo";

// ==========================================
// Sidebar Logo Component
// ==========================================

export default function AppSidebar() {
  const { user } = useCurrentUser();
  const pathname = usePathname();
  const router = useRouter();
  const filteredItems = useFilteredNavItems(navItems);

  // Footer state for user dropdown chevron animation
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const userChevronRef = React.useRef<HTMLDivElement>(null);

  // Ref for sidebar items container to stagger animation
  const itemsContainerRef = React.useRef<HTMLUListElement>(null);

  // Stagger animation for sidebar items on mount
  React.useEffect(() => {
    try {
      if (itemsContainerRef.current) {
        // Select all direct list items or buttons
        // Using a more generic selector or class to find children
        const items = itemsContainerRef.current.children;

        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: "power2.out",
              clearProps: "all",
            },
          );
        }
      }
    } catch (e) {
      console.error("GSAP animation error:", e);
    }
  }, []);

  // Animate User Dropdown Chevron
  React.useEffect(() => {
    if (userChevronRef.current) {
      gsap.to(userChevronRef.current, {
        rotation: isUserDropdownOpen ? 180 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isUserDropdownOpen]);

  // Sidebar Item Hover Interaction
  const handleMouseEnter = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    gsap.to(e.currentTarget, {
      x: 4,
      scale: 1.02,
      duration: 0.2,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    gsap.to(e.currentTarget, {
      x: 0,
      scale: 1,
      duration: 0.2,
      ease: "power1.out",
    });
  };

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu ref={itemsContainerRef}>
            {filteredItems.map((item) => {
              const Icon = item.icon ? Icons[item.icon] : Icons.logo;
              return item?.items && item?.items?.length > 0 ? (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem className="sidebar-item-trigger">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={
                          pathname === item.url ||
                          pathname.startsWith(`${item.url}/`)
                        }
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.icon && <Icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={
                                pathname === subItem.url ||
                                pathname.startsWith(`${subItem.url}/`)
                              }
                              onMouseEnter={(e) =>
                                gsap.to(e.currentTarget, {
                                  x: 4,
                                  duration: 0.2,
                                })
                              }
                              onMouseLeave={(e) =>
                                gsap.to(e.currentTarget, {
                                  x: 0,
                                  duration: 0.2,
                                })
                              }
                            >
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem
                  key={item.title}
                  className="sidebar-item-trigger"
                >
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={
                      pathname === item.url ||
                      pathname.startsWith(`${item.url}/`)
                    }
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link href={item.url}>
                      <Icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator className="mx-4" />
        <SidebarGroup>
          <SidebarGroupLabel>Halaman</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip="Kembali ke Beranda"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link href="/">
                  <Home />
                  <span>Beranda</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Pusat Bantuan
            </p>
            <Button
              variant="outline"
              asChild
              className="w-full justify-center bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 shadow-sm"
            >
              <Link href="/user/help">Hubungi Kami</Link>
            </Button>
          </div>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu
              open={isUserDropdownOpen}
              onOpenChange={setIsUserDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  {user && (
                    <UserAvatarProfile
                      className="h-8 w-8 rounded-lg"
                      showInfo
                      email={user.email}
                      name={user.name}
                      imageUrl={user.image || ""}
                    />
                  )}
                  <div ref={userChevronRef}>
                    <ChevronsDown className="ml-auto size-4" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="px-1 py-1.5">
                    {user && (
                      <UserAvatarProfile
                        className="h-8 w-8 rounded-lg"
                        showInfo
                        email={user.email}
                        name={user.name}
                        imageUrl={user.image || ""}
                      />
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => router.push("/admin/profile")}
                  >
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <SignoutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
