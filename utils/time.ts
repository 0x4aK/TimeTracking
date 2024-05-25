import { getWeek as DFgetWeek, lightFormat } from "date-fns";

export const WEEKDAYS = new Map([
  [1, "Ma"],
  [2, "Ti"],
  [3, "Ke"],
  [4, "To"],
  [5, "Pe"],
  [6, "La"],
  [0, "Su"],
]);

export const formatTime = (date: Date) => lightFormat(date, "H:mm:ss");
export const formatDate = (date: Date) => lightFormat(date, "d.M.yyyy");

export function getWeek(date: string | number | Date) {
  return DFgetWeek(date, { weekStartsOn: 1 });
}

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
