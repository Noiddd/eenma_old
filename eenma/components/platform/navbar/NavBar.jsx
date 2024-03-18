"use client";

import React from "react";
import { MenuIcon } from "lucide-react";

export default function NavBar() {
  return (
    <div className="w-full ml-[110px] h-[57px] border-b transition-all ease-in-out duration-300">
      <MenuIcon
        role="button"
        className="h-5 w-5 text-muted-foreground transition-all ease-in-out duration-300 cursor-default hover:text-black dark:hover:text-white"
      />
      navbar
    </div>
  );
}
