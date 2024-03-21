"use client";

import React, { useCallback, useState } from "react";

import { format, add, sub } from "date-fns";

import { ChevronLeftIcon, ChevronRightIcon, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import useDays from "@/hooks/useDays";
import Link from "next/link";

//import { Menu, Transition } from "@headlessui/react";

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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ScheduleCalender({ view }) {
  console.log(view);
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

  console.log("DAYSSS");
  console.log(days);

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
      <div className="rounded-lg shadow ring-2 ring-black dark:ring-slate-500 ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 dark:text-white lg:flex-none rounded-tr-lg rounded-tl-lg">
          <div className="bg-background py-2 rounded-tl-lg">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
          <div className="bg-background py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-background py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-background py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-background py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-background py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-background py-2 rounded-tr-lg">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-5 text-gray-700 dark:text-white lg:flex-auto rounded-lg">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px rounded-lg">
            {days.map((day, i) => (
              <div
                key={day.date}
                className={classNames(
                  day.isCurrentMonth
                    ? "bg-background"
                    : "bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
                  i + 1 === days.length && "rounded-br-lg",
                  i + 1 === days.length - 6 && "rounded-bl-lg",
                  "relative px-3 py-2 hover:rounded-br-3xl min-h-24"
                )}
              >
                <time
                  dateTime={day.date}
                  className={
                    day.isToday
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-green font-semibold text-black"
                      : undefined
                  }
                >
                  {day.date.split("-").pop().replace(/^0/, "")}
                </time>
                {day.events.length > 0 && (
                  <ol className="mt-1">
                    {day.events.slice(0, 2).map((event) => (
                      <li key={event.id} className="">
                        <a href={event.href} className="group flex">
                          <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-green dark:text-white">
                            {event.name}
                          </p>
                          <time
                            dateTime={event.datetime}
                            className="ml-3 hidden flex-none text-gray-500 group-hover:text-green xl:block dark:text-white"
                          >
                            {event.time}
                          </time>
                        </a>
                      </li>
                    ))}
                    {day.events.length > 2 && (
                      <li className="text-gray-500">
                        + {day.events.length - 2} more
                      </li>
                    )}
                  </ol>
                )}
              </div>
            ))}
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {days.map((day) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  day.isCurrentMonth ? "bg-background" : "bg-gray-50",
                  (day.isSelected || day.isToday) && "font-semibold",
                  day.isSelected && "text-white",
                  !day.isSelected && day.isToday && "text-green",
                  !day.isSelected &&
                    day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-900",
                  !day.isSelected &&
                    !day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-500",
                  "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10"
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    day.isSelected &&
                      "flex h-6 w-6 items-center justify-center rounded-full",
                    day.isSelected && day.isToday && "bg-green",
                    day.isSelected && !day.isToday && "bg-gray-900",
                    "ml-auto"
                  )}
                >
                  {day.date.split("-").pop().replace(/^0/, "")}
                </time>
                <span className="sr-only">{day.events.length} events</span>
                {day.events.length > 0 && (
                  <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.events.map((event) => (
                      <span
                        key={event.id}
                        className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                      />
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
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
