import ScheduleCalender from "@/components/schedule/ScheduleCalender";
import React from "react";

export default function Schedule({ params }) {
  return (
    <div className="px-[200px] h-full">
      <ScheduleCalender view={params.view} />
    </div>
  );
}
