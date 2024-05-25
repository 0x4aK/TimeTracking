import { isSameWeek as DFisSameWeek, getWeek as DFgetWeek, lightFormat } from "date-fns";

export function isSameWeek(dateLeft: string | number | Date, dateRight: string | number | Date) {
  return DFisSameWeek(dateLeft, dateRight, { weekStartsOn: 1 });
}

export function getWeek(date: string | number | Date) {
  return DFgetWeek(date, { weekStartsOn: 1 });
}

export function dayToName(day: string | number) {
  return WEEKDAYS.find((obj) => obj.day == day)?.label;
}

export const formatTime = (date: Date) => lightFormat(date, "H:mm:ss");
export const formatDate = (date: Date) => lightFormat(date, "d.M.yyyy");

export const WEEKDAYS = [
  { day: "1", label: "Ma" },
  { day: "2", label: "Ti" },
  { day: "3", label: "Ke" },
  { day: "4", label: "To" },
  { day: "5", label: "Pe" },
  { day: "6", label: "La" },
  { day: "0", label: "Su" },
] as const;

export function secondsToHumanReadable(seconds: number) {
  const results: string[] = [];
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) results.push(`${h}h`);
  if (m > 0) results.push(`${m}min`);
  if (s > 0) results.push(`${s}s`);

  return results.join(" ");
}
