import { atom } from "jotai";

export const currentMonthAtom = atom(new Date());
export const currentWeekAtom = atom([]);

export const weekNumberAtom = atom();
