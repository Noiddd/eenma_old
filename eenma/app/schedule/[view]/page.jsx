"use server";

import ScheduleCalender from "@/components/schedule/ScheduleCalender";
import useUserSession from "@/hooks/useUserSession";
import { redirect } from "next/navigation";
import React from "react";

export default async function Schedule({ params }) {
  const { data, error } = await useUserSession();

  if (error || !data?.user) {
    return redirect("/");
  }

  return (
    <div className="px-[200px] h-full">
      <ScheduleCalender view={params.view} />
    </div>
  );
}
