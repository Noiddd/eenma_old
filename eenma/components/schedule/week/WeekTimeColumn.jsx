"use client";

import React from "react";

import { ScheduleTimes } from "@/constants/schedule/ScheduleTimes";
import WeekTime from "./WeekTime";

export default function WeekTimeColumn() {
  return (
    <>
      {ScheduleTimes.map((time) => (
        <WeekTime key={time.time} time={time.time} />
      ))}
    </>
  );
}
