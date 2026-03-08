"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronsDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export const SidebarLogo = () => {
  const { state } = useSidebar();
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null); // Ref for Chevron
  const [isOpen, setIsOpen] = useState(false); // State for Dropdown

  useEffect(() => {
    if (state === "expanded") {
      const tl = gsap.timeline();
      tl.fromTo(
        logoRef.current,
        { rotation: -45, opacity: 0, scale: 0.5 },
        {
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
      ).fromTo(
        textRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.3",
      );
    }
  }, [state]);

  // Animate Chevron Rotation based on dropdown state
  useEffect(() => {
    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        rotation: isOpen ? 180 : 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isOpen]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div
                ref={logoRef}
                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
              >
                <Image
                  alt="Logo"
                  src="/img/logo/favicon-32x-32.png"
                  className="size-4"
                  fill
                />
              </div>
              <div
                ref={textRef}
                className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden"
              >
                <span className="truncate font-semibold uppercase tracking-wider">
                  Robah
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Manajemen Sampah
                </span>
              </div>
              <div ref={chevronRef}>
                <ChevronsDown className="ml-auto size-4" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Individu
            </DropdownMenuLabel>
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-sm border">
                <Image
                  alt="Logo"
                  src="/img/logo/favicon-32x-32.png"
                  className="size-4"
                  fill
                />
              </div>
              Robah
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
