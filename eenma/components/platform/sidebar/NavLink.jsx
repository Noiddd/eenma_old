"use client";

import React from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Calendar, LayoutDashboard, SquarePlus, Mail } from "lucide-react";

export default function NavLink({ href, value, ...props }) {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <div className={`flex relative items-center group`}>
      <Link href={href}>
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

        {value == "Inbox" && (
          <Mail
            strokeWidth={2.5}
            className="h-4 w-4 text-muted-foreground hover:text-black dark:hover:text-white cursor-default"
          />
        )}
      </Link>
      <div className="transition delay-300 duration-200 ease-in-out group-hover:opacity-100 dark:group-hover:opacity-100 opacity-0 absolute left-7 z-50 rounded-md border bg-popover px-3 py-2 text-popover-foreground shadow-md outline-none">
        {value}
      </div>
    </div>
  );
}
