import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameMonth,
  isThisMonth,
  setDay,
  startOfMonth,
  sub,
} from "date-fns";

export default function useDaysWeek({ currentMonth }) {
  let daysWeekObj = [];
  let returnDaysWeek = [];
  let groupWeek = [];
  let connectDaysFromPrevMonth = [];
  let connectDaysFromNextMonth = [];
  let daysInMonth = [];

  // generate current date
  const currentDate = currentMonth;

  // generate previous and next month from today
  const previousMonth = sub(currentDate, { months: 1 });
  const nextMonth = add(currentDate, { months: 1 });

  // generate first and last day
  const firstDayOfCurrentMonth = startOfMonth(currentDate);
  const lastDayOfCurrentMonth = endOfMonth(currentDate);

  // generate start and end day index of first day of current month, 0 = sun
  const startDayIndex = getDay(firstDayOfCurrentMonth);
  const lastDayIndex = getDay(lastDayOfCurrentMonth);

  // generate last day of previous month
  const lastDayOfPrevMonth = endOfMonth(previousMonth);

  // generate first day of next month and index
  const firstDayOfNextMonth = startOfMonth(nextMonth);
  const firstDayOfNextMonthIndex = getDay(firstDayOfNextMonth);

  // if first day is not monday
  if (startDayIndex != 1) {
    const firstMonday = setDay(firstDayOfCurrentMonth, 1, {
      weekStartsOn: getDay(firstDayOfCurrentMonth),
    });

    // generate days in current month
    daysInMonth = eachDayOfInterval({
      start: firstMonday,
      end: lastDayOfCurrentMonth,
    });
  } else {
    // generate days in current month
    daysInMonth = eachDayOfInterval({
      start: firstDayOfCurrentMonth,
      end: lastDayOfCurrentMonth,
    });
  }

  if (lastDayIndex != 0) {
    if (firstDayOfNextMonthIndex == 1) {
      connectDaysFromNextMonth = eachDayOfInterval({
        start: firstDayOfNextMonth,
        end: add(firstDayOfNextMonth, {
          days: 1,
        }),
      });
    } else {
      connectDaysFromNextMonth = eachDayOfInterval({
        start: firstDayOfNextMonth,
        end: add(firstDayOfNextMonth, {
          days: 7 - firstDayOfNextMonthIndex,
        }),
      });
    }
  }

  // adding all days together, prev + current + next
  const days = daysInMonth.concat(connectDaysFromNextMonth);

  for (let day of days) {
    daysWeekObj.push({
      date: format(day, "yyyy-MM-dd"),
      isCurrentMonth: isSameMonth(day, currentDate),
      isSelected: false,
      isToday: format(day, "yyyy-MM-dd") == format(new Date(), "yyyy-MM-dd"),
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

  let currentWeekIndex = Math.floor(
    daysWeekObj.findIndex((item) => item.isToday === true) / 7
  );

  while (daysWeekObj.length > 0) {
    groupWeek.push(daysWeekObj.splice(0, 7));
  }

  returnDaysWeek = {
    days: [...groupWeek],
    currentWeekIndex: currentWeekIndex,
  };

  return returnDaysWeek;
}
