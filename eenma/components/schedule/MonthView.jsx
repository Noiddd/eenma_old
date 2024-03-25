"use client";

import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import DayView from "./DayView";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MonthView({ days }) {
  return (
    <div className="h-[670px] rounded-lg shadow ring-2 ring-black dark:ring-slate-500 ring-opacity-5 lg:flex lg:flex-auto lg:flex-col ">
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
        <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px rounded-lg border-slate-400">
          {days.map((day, i) => (
            <Sheet>
              <SheetTrigger asChild>
                <div
                  key={day.date}
                  className={classNames(
                    day.isCurrentMonth
                      ? "bg-background"
                      : "bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
                    i + 1 === days.length && "rounded-br-lg",
                    i + 1 === days.length - 6 && "rounded-bl-lg",
                    "relative px-3 py-2 hover:rounded-br-3xl"
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
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Schedule Post</SheetTitle>
                  <SheetDescription>
                    Schedule a post on {day.date}
                  </SheetDescription>
                </SheetHeader>
                <DayView />
              </SheetContent>
            </Sheet>
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
  );
}
