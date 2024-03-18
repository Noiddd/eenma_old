"use client";

import React from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Calendar, LayoutDashboard, SquarePlus } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function NavLink({ href, value, ...props }) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <HoverCard>
      <HoverCardTrigger href={href}>
        {value == "Analytics" && (
          <LayoutDashboard
            strokeWidth={2.5}
            className="h-4 w-4 text-muted-foreground hover:text-black dark:hover:text-white cursor-default"
          />
        )}
        {value == "Schedule" && (
          <Calendar
            strokeWidth={2.5}
            className="h-4 w-4 text-muted-foreground hover:text-black dark:hover:text-white cursor-default"
          />
        )}
        {value == "Post" && (
          <SquarePlus
            strokeWidth={2.5}
            className="h-4 w-4 text-muted-foreground hover:text-black dark:hover:text-white cursor-default"
          />
        )}
      </HoverCardTrigger>
      <HoverCardContent side="right">{value}</HoverCardContent>
    </HoverCard>
  );
}
