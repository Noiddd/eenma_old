"use client";

import { useAtom } from "jotai";
import Navigation from "./Navigation";
import { isSideBarCollapse } from "@/jotai/sidebar_jotai";
import Profile from "./Profile";
import { ChevronsLeft } from "lucide-react";

export default function Sidebar() {
  const [sideBarCollapsed, setSideBarCollapsed] = useAtom(isSideBarCollapse);

  const collapseSideBar = () => {
    setSideBarCollapsed(true);
  };

  return (
    <div
      className={`group/sidebar absolute hidden sm:block sm:w-[220px] h-full bg-background border-r transition-all ease-in-out duration-100 w-0 ${
        sideBarCollapsed && "opacity-0 z-[-999999]"
      }`}
    >
      <div
        role="button"
        onClick={collapseSideBar}
        className="opacity-0 flex justify-center items-center h-6 w-6 text-muted-foreground absolute top-3.5 right-4 group-hover/sidebar:opacity-100 cursor-default transition-all"
      >
        <ChevronsLeft className="h-5 w-5 hover:text-black dark:hover:text-white" />
      </div>
      <Profile />

      <Navigation />
    </div>
  );
}
