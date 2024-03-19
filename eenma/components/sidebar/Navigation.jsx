"use client";

import React from "react";

import NavLink from "./NavLink";

import { navigationIcons } from "@/constants/NavigationIcons";

export default function Navigation() {
  return (
    <div className="flex flex-col gap-5 text-xs font-medium">
      {navigationIcons.map((navigationLink) => (
        <NavLink
          key={navigationLink.value}
          href={navigationLink.href}
          value={navigationLink.value}
        />
      ))}
    </div>
  );
}
