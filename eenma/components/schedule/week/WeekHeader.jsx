"use client";

import React from "react";

import { format } from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function WeekHeader({ day }) {
  console.log(day);
  return (
    <div
      className={classNames(
        day.isCurrentMonth
          ? "bg-background"
          : "bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
        "flex items-center justify-center h-[45px]"
      )}
    >
      <span className={day.isToday ? "flex items-baseline" : ""}>
        {format(day.date, "ccc")}{" "}
        <span
          className={
            day.isToday
              ? "ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-green font-semibold text-black dark:text-black"
              : "h-8 w-8 items-center justify-center font-semibold text-gray-900 dark:text-white"
          }
        >
          {format(day.date, "d")}
        </span>
      </span>
    </div>
  );
}
