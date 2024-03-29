"use client";

import React, { useEffect, useMemo, useState } from "react";

import { format, add, sub } from "date-fns";

import { ChevronLeftIcon, ChevronRightIcon, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import useDays from "@/hooks/useDays";
import Link from "next/link";
import MonthView from "./month/MonthView";
import WeekView from "./week/WeekView";
import { usePathname } from "next/navigation";
import useDaysWeek from "@/hooks/useDaysWeek";

export default function ScheduleCalender({ view }) {
  const [initialMonth, setInitialMonth] = useState(new Date());

  const days = useMemo(() => useDays({ initialMonth }), [initialMonth]);
  const daysWeek = useMemo(() => useDaysWeek({ initialMonth }), [initialMonth]);

  useEffect(() => {
    setInitialWeek(daysWeek[0]);
  }, [initialMonth]);

  const [initialWeek, setInitialWeek] = useState(daysWeek[0]);
  const [weekNumber, setWeekNumber] = useState(0);

  let pathname = usePathname();

  const handleNext = () => {
    if (view == "month") {
      setInitialMonth((prev) => add(prev, { months: 1 }));
    }

    if (view == "week") {
      if (weekNumber == daysWeek.length - 1) {
        console.log("next month");
        setInitialMonth((prev) => add(prev, { months: 1 }));

        // setInitialWeek(daysWeek[0]);

        setWeekNumber(0);
        return;
      }

      setWeekNumber((prev) => prev + 1);

      setInitialWeek(daysWeek[weekNumber + 1]);
    }
  };
  const handlePrev = () => {
    if (view == "month") {
      setInitialMonth((prev) => sub(prev, { months: 1 }));
    }

    if (view == "week") {
      if (weekNumber == 0) {
        console.log("previous month");
        setInitialMonth((prev) => sub(prev, { months: 1 }));

        setInitialWeek(daysWeek[daysWeek.length - 1]);

        return;
      }

      setWeekNumber((prev) => prev - 1);

      setInitialWeek(daysWeek[weekNumber]);
    }
  };

  const handleToday = () => {
    setInitialMonth(new Date());
  };

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
            onClick={handlePrev}
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
            onClick={handleNext}
          >
            <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
          </Button>
        </div>
      </header>
      {pathname == "/schedule/month" && <MonthView days={days} />}
      {pathname == "/schedule/week" && <WeekView days={initialWeek} />}

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
