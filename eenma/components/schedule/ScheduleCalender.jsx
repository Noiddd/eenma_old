"use client";

import React, { useCallback, useState } from "react";

import { format, add, sub } from "date-fns";

import { ChevronLeftIcon, ChevronRightIcon, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import useDays from "@/hooks/useDays";
import Link from "next/link";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import { usePathname } from "next/navigation";

const day = [
  { date: "2021-12-27", isCurrentMonth: false, events: [] },
  { date: "2021-12-28", isCurrentMonth: false, events: [] },
  { date: "2021-12-29", isCurrentMonth: false, events: [] },
  { date: "2021-12-30", isCurrentMonth: false, events: [] },
  { date: "2021-12-31", isCurrentMonth: false, events: [] },
  { date: "2022-01-01", isCurrentMonth: true, events: [] },
  { date: "2022-01-02", isCurrentMonth: true, events: [] },
  {
    date: "2022-01-03",
    isCurrentMonth: true,
    events: [
      {
        id: 1,
        name: "Design review",
        time: "10AM",
        datetime: "2022-01-03T10:00",
        href: "#",
      },
      {
        id: 2,
        name: "Sales meeting",
        time: "2PM",
        datetime: "2022-01-03T14:00",
        href: "#",
      },
    ],
  },
  { date: "2022-01-04", isCurrentMonth: true, events: [] },
  { date: "2022-01-05", isCurrentMonth: true, events: [] },
  { date: "2022-01-06", isCurrentMonth: true, events: [] },
  {
    date: "2022-01-07",
    isCurrentMonth: true,
    events: [
      {
        id: 3,
        name: "Date night",
        time: "6PM",
        datetime: "2022-01-08T18:00",
        href: "#",
      },
    ],
  },
  { date: "2022-01-08", isCurrentMonth: true, events: [] },
  { date: "2022-01-09", isCurrentMonth: true, events: [] },
  { date: "2022-01-10", isCurrentMonth: true, events: [] },
  { date: "2022-01-11", isCurrentMonth: true, events: [] },
  {
    date: "2022-01-12",
    isCurrentMonth: true,
    isToday: true,
    events: [
      {
        id: 6,
        name: "Sam's birthday party",
        time: "2PM",
        datetime: "2022-01-25T14:00",
        href: "#",
      },
    ],
  },
  { date: "2022-01-13", isCurrentMonth: true, events: [] },
  { date: "2022-01-14", isCurrentMonth: true, events: [] },
  { date: "2022-01-15", isCurrentMonth: true, events: [] },
  { date: "2022-01-16", isCurrentMonth: true, events: [] },
  { date: "2022-01-17", isCurrentMonth: true, events: [] },
  { date: "2022-01-18", isCurrentMonth: true, events: [] },
  { date: "2022-01-19", isCurrentMonth: true, events: [] },
  { date: "2022-01-20", isCurrentMonth: true, events: [] },
  { date: "2022-01-21", isCurrentMonth: true, events: [] },
  {
    date: "2022-01-22",
    isCurrentMonth: true,
    isSelected: true,
    events: [],
  },
  { date: "2022-01-23", isCurrentMonth: true, events: [] },
  { date: "2022-01-24", isCurrentMonth: true, events: [] },
  { date: "2022-01-25", isCurrentMonth: true, events: [] },
  { date: "2022-01-26", isCurrentMonth: true, events: [] },
  { date: "2022-01-27", isCurrentMonth: true, events: [] },
  { date: "2022-01-28", isCurrentMonth: true, events: [] },
  { date: "2022-01-29", isCurrentMonth: true, events: [] },
  { date: "2022-01-30", isCurrentMonth: true, events: [] },
  { date: "2022-01-31", isCurrentMonth: true, events: [] },
  { date: "2022-02-01", isCurrentMonth: false, events: [] },
  { date: "2022-02-02", isCurrentMonth: false, events: [] },
  { date: "2022-02-03", isCurrentMonth: false, events: [] },
  {
    date: "2022-02-04",
    isCurrentMonth: false,
    events: [
      {
        id: 7,
        name: "Cinema with friends",
        time: "9PM",
        datetime: "2022-02-04T21:00",
        href: "#",
      },
    ],
  },
  { date: "2022-02-05", isCurrentMonth: false, events: [] },
  { date: "2022-02-06", isCurrentMonth: false, events: [] },
];

export default function ScheduleCalender({ view }) {
  let pathname = usePathname();

  const [initialMonth, setInitialMonth] = useState(new Date());

  const handleNextMonth = () => {
    setInitialMonth((prev) => add(prev, { months: 1 }));
  };
  const handlePrevMonth = () => {
    setInitialMonth((prev) => sub(prev, { months: 1 }));
  };

  const handleToday = () => {
    setInitialMonth(new Date());
  };

  const days = useCallback(useDays({ initialMonth }), [initialMonth]);

  const selectedDay = days.find((day) => day.isSelected);

  return (
    <div className="lg:flex lg:flex-col relative top-[50%] translate-y-[-52%]">
      <header className="flex items-center justify-between px-6 py-4 lg:flex-none">
        <h1 className="w-40 text-lg font-semibold leading-6 text-gray-900 dark:text-white">
          <time dateTime="2022-01">{format(initialMonth, "MMMM yyyy")}</time>
        </h1>
        <div className="flex gap-8 text-xs font-medium">
          <Link
            href={"/schedule/week"}
            className={`${
              view == "week" && "bg-secondary"
            } cursor-default h-8 rounded-md text-xs px-3 hover:bg-secondary text-secondary-foreground inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50`}
          >
            Week
          </Link>

          <Link
            href={"/schedule/month"}
            className={`${
              view == "month" && "bg-secondary"
            } cursor-default h-8 rounded-md text-xs px-3 hover:bg-secondary text-secondary-foreground inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50`}
          >
            Month
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            className="gap-2 h-7 rounded-md px-2"
            onClick={handlePrevMonth}
          >
            <ChevronLeftIcon className="h-3 w-3" aria-hidden="true" />
          </Button>
          <Button
            variant="secondary"
            className="cursor-default gap-2 h-7 rounded-md px-4 text-xs bg-green hover:bg-greenhover dark:hover:bg-greenhover text-black"
            onClick={handleToday}
          >
            Today
          </Button>
          <Button
            variant="secondary"
            className="gap-2 h-7 rounded-md px-2"
            onClick={handleNextMonth}
          >
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
          </Button>
        </div>
      </header>
      {pathname == "/schedule/month" && <MonthView days={days} />}
      {pathname == "/schedule/week" && <WeekView />}

      {selectedDay?.events.length > 0 && (
        <div className="px-4 py-10 sm:px-6 lg:hidden ">
          <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-background text-sm shadow ring-1 ring-black ring-opacity-5">
            {selectedDay.events.map((event) => (
              <li
                key={event.id}
                className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
              >
                <div className="flex-auto">
                  <p className="font-semibold text-gray-900">{event.name}</p>
                  <time
                    dateTime={event.datetime}
                    className="mt-2 flex items-center text-gray-700"
                  >
                    <Clock
                      className="mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {event.time}
                  </time>
                </div>
                <a
                  href={event.href}
                  className="ml-6 flex-none self-center rounded-md bg-background px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                >
                  Edit<span className="sr-only">, {event.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
