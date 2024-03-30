"use client";

import React, { useEffect, useMemo } from "react";

import { format, add, sub, getWeek, getWeekOfMonth } from "date-fns";

import { ChevronLeftIcon, ChevronRightIcon, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import useDays from "@/hooks/useDays";
import Link from "next/link";
import MonthView from "./month/MonthView";
import WeekView from "./week/WeekView";
import useDaysWeek from "@/hooks/useDaysWeek";
import { useAtom } from "jotai";
import {
  currentMonthAtom,
  currentWeekAtom,
  weekNumberAtom,
} from "@/jotai/scheduleJotai";

export default function ScheduleCalender({ view }) {
  const [currentMonth, setCurrentMonth] = useAtom(currentMonthAtom);
  const [currentWeek, setCurrentWeek] = useAtom(currentWeekAtom);
  const [weekNumber, setWeekNumber] = useAtom(weekNumberAtom);

  const days = useMemo(() => useDays({ currentMonth }), [currentMonth]);
  const daysWeek = useMemo(() => useDaysWeek({ currentMonth }), [currentMonth]);

  useEffect(() => {
    setCurrentWeek(daysWeek.days[0]);
  }, []);

  useEffect(() => {
    if (weekNumber == -1) {
      console.log("prev month");

      // when previous month is clicked
      setCurrentWeek(daysWeek.days[daysWeek.days.length - 1]);

      setWeekNumber(daysWeek.days.length - 1);
    } else if (weekNumber == -2) {
      console.log("in today click");
      // when today is clicked

      console.log(getWeekOfMonth(new Date(2024, 4, 7)) - 2);

      setCurrentWeek(daysWeek.days[daysWeek.currentWeekIndex]);
      setWeekNumber(daysWeek.currentWeekIndex);
    } else {
      console.log("jump month");
      // when next month is clicked
      setCurrentWeek(daysWeek.days[0]);

      setWeekNumber(0);
    }
  }, [currentMonth]);

  const handleNext = () => {
    if (view == "month") {
      setCurrentMonth((prev) => add(prev, { months: 1 }));
    }

    if (view == "week") {
      if (weekNumber == daysWeek.days.length - 1) {
        console.log("next month");
        setCurrentMonth((prev) => add(prev, { months: 1 }));

        return;
      }

      setWeekNumber((prev) => prev + 1);

      setCurrentWeek(daysWeek.days[weekNumber + 1]);
    }
  };
  const handlePrev = () => {
    if (view == "month") {
      setCurrentMonth((prev) => sub(prev, { months: 1 }));
    }

    if (view == "week") {
      if (weekNumber == 0) {
        console.log("previous month");
        setCurrentMonth((prev) => sub(prev, { months: 1 }));

        setWeekNumber(-1);

        return;
      }

      setWeekNumber((prev) => prev - 1);

      setCurrentWeek(daysWeek.days[weekNumber - 1]);
    }
  };

  const handleToday = () => {
    console.log("in handle today function");
    setCurrentMonth(new Date());

    setWeekNumber(-2);
  };

  const selectedDay = days.find((day) => day.isSelected);

  return (
    <div className="lg:flex lg:flex-col relative top-[50%] translate-y-[-52%]">
      <header className="flex items-center justify-between px-6 py-4 lg:flex-none">
        <h1 className="w-40 text-lg font-semibold leading-6 text-gray-900 dark:text-white">
          <time dateTime="2022-01">{format(currentMonth, "MMMM yyyy")}</time>
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
      {view == "month" && <MonthView days={days} />}
      {view == "week" && <WeekView days={currentWeek} />}

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
