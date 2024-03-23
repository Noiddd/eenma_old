import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameMonth,
  isThisMonth,
  startOfMonth,
  sub,
} from "date-fns";

export default function useDays({ initialMonth }) {
  let returnDays = [];
  let connectDaysFromPrevMonth = [];
  let connectDaysFromNextMonth = [];

  // generate current date
  const currentDate = initialMonth;

  // generate previous and next month from today
  const previousMonth = sub(currentDate, { months: 1 });
  const nextMonth = add(currentDate, { months: 1 });

  // generate first and last day
  const firstDayOfCurrentMonth = startOfMonth(currentDate);
  const lastDayOfCurrentMonth = endOfMonth(currentDate);

  // generate days in current month
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfCurrentMonth,
    end: lastDayOfCurrentMonth,
  });

  // generate start and end day index of first day of current month, 0 = sun
  const startDayIndex = getDay(firstDayOfCurrentMonth);
  const lastDayIndex = getDay(lastDayOfCurrentMonth);

  // generate last day of previous month
  const lastDayOfPrevMonth = endOfMonth(previousMonth);

  // generate first day of next month
  const firstDayOfNextMonth = startOfMonth(nextMonth);

  if (startDayIndex != 0) {
    // generate connecting days from previous and next month
    connectDaysFromPrevMonth = eachDayOfInterval({
      start: sub(lastDayOfPrevMonth, { days: startDayIndex - 1 }),
      end: lastDayOfPrevMonth,
    });
  }

  connectDaysFromNextMonth = eachDayOfInterval({
    start: firstDayOfNextMonth,
    end: add(firstDayOfNextMonth, {
      days: 41 - connectDaysFromPrevMonth.concat(daysInMonth).length,
    }),
  });

  // adding all days together, prev + current + next
  const days = connectDaysFromPrevMonth
    .concat(daysInMonth)
    .concat(connectDaysFromNextMonth);

  for (let day of days) {
    returnDays.push({
      date: format(day, "yyyy-MM-dd"),
      isCurrentMonth: isSameMonth(day, currentDate),
      isSelected: false,
      isToday: format(day, "yyyy-MM-dd") == format(currentDate, "yyyy-MM-dd"),
      events:
        format(day, "yyyy-MM-dd") == format(currentDate, "yyyy-MM-dd")
          ? [
              {
                id: 1,
                name: "Design review",
                time: "10AM",
                datetime: "2022-01-03T10:00",
                href: "#",
              },
            ]
          : [],
    });
  }

  return returnDays;
}
