"use client";

import Navigation from "./Navigation";
import Profile from "./Profile";

export default function Sidebar() {
  return (
    <div className="flex flex-col fixed justify-between items-center sm:w-[110px] h-[55%] bg-backgrounda transition-all ease-in-out duration-100">
      <Profile />

      <Navigation />
    </div>
  );
}
