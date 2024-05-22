import { isSameWeek as DFisSameWeek, getWeek as DFgetWeek } from "date-fns";

export function isSameWeek(dateLeft: string | number | Date, dateRight: string | number | Date) {
  return DFisSameWeek(dateLeft, dateRight, { weekStartsOn: 1 });
}

export function getWeek(date: string | number | Date) {
  return DFgetWeek(date, { weekStartsOn: 1 });
}
