"use client";

import React from "react";

import { useAtom } from "jotai";
import { isSideBarCollapse } from "@/jotai/sidebar_jotai";
import { MenuIcon } from "lucide-react";

export default function NavBar() {
  const [sideBarCollapsed, setSideBarCollapsed] = useAtom(isSideBarCollapse);

  const openSideBar = () => {
    setSideBarCollapsed(false);
  };

  return (
    <div
      className={`w-full ml-[220px] h-[57px] border-b transition-all ease-in-out duration-300 ${
        sideBarCollapsed && "ml-[0]"
      }`}
    >
      <MenuIcon
        onClick={openSideBar}
        role="button"
        className={`h-5 w-5 text-muted-foreground transition-all ease-in-out duration-300 cursor-default hover:text-black dark:hover:text-white
              ${sideBarCollapsed ? "block" : "hidden"}
              `}
      />
      nacbar
    </div>
  );
}
