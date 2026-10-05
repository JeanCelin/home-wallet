import { APP_TIMEZONE } from "../config/date.js";

export function getToday(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: APP_TIMEZONE,
  }).format(new Date());
}

export function calendarDateToDate(date: string): Date {
  return new Date(`${date}T00:00:00.000Z`);
}