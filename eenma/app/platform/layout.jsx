import NavBar from "@/components/platform/navbar/NavBar";
import Sidebar from "@/components/platform/sidebar/SideBar";
import React from "react";

export default function layout({ children }) {
  return (
    <div>
      <Sidebar />
      <NavBar />
      {children}
    </div>
  );
}
