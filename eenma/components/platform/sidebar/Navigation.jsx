"use client";

import React from "react";
import Link from "next/link";

export default function Navigation() {
  return (
    <div className="text-xs font-medium">
      <div>
        <Link
          className="block py-2.5 px-3 hover:bg-primary/5"
          href="/platform/schedule"
        >
          Schedule
        </Link>
        <Link
          className="block py-2.5 px-3 hover:bg-primary/5"
          href="/platform/analytics"
        >
          Analytics
        </Link>
      </div>
    </div>
  );
}
