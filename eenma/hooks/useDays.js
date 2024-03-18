import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isThisMonth,
  startOfMonth,
  sub,
} from "date-fns";

export default function useDays() {
  let returnDays = [];

  // generate current date
  const currentDate = new Date();

  // generate previous and next month from today
  const previousMonth = sub(new Date(), { months: 1 });
  const nextMonth = add(new Date(), { months: 1 });

  // generate first and last day
  const firstDayOfCurrentMonth = startOfMonth(currentDate);
  const lastDayOfCurrentMonth = endOfMonth(currentDate);

  // generate days in current month
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfCurrentMonth,
    end: lastDayOfCurrentMonth,
  });

  // generate start day index of first day of current month, 0 = sun
  const startDayIndex = getDay(firstDayOfCurrentMonth);

  // generate last day of previous month
  const lastDayOfPrevMonth = endOfMonth(previousMonth);

  // generate first day of next month
  const firstDayOfNextMonth = startOfMonth(nextMonth);

  // generate connecting days from previous and next month
  const connectDaysFromPrevMonth = eachDayOfInterval({
    start: sub(lastDayOfPrevMonth, { days: startDayIndex - 1 }),
    end: lastDayOfPrevMonth,
  });

  const connectDaysFromNextMonth = eachDayOfInterval({
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
      isCurrentMonth: isThisMonth(day),
      isSelected:
        format(day, "yyyy-MM-dd") == format(currentDate, "yyyy-MM-dd"),
      isToday: format(day, "yyyy-MM-dd") == format(currentDate, "yyyy-MM-dd"),
      events: [],
    });
  }

  return returnDays;
}
