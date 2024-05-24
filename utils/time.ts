import { isSameWeek as DFisSameWeek, getWeek as DFgetWeek } from "date-fns";

export function isSameWeek(dateLeft: string | number | Date, dateRight: string | number | Date) {
  return DFisSameWeek(dateLeft, dateRight, { weekStartsOn: 1 });
}

export function getWeek(date: string | number | Date) {
  return DFgetWeek(date, { weekStartsOn: 1 });
}

export function dayToName(day: string | number) {
  return WEEKDAYS.find((obj) => obj.day == day)?.label;
}

export const WEEKDAYS = [
  { day: "1", label: "Ma" },
  { day: "2", label: "Ti" },
  { day: "3", label: "Ke" },
  { day: "4", label: "To" },
  { day: "5", label: "Pe" },
  { day: "6", label: "La" },
  { day: "0", label: "Su" },
] as const;
