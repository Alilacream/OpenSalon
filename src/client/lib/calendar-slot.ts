export function calendarSlotMinutes(
  offsetY: number,
  height: number,
  dayStart: number,
  dayEnd: number,
  interval = 15,
): number {
  if (height <= 0 || dayEnd <= dayStart || interval <= 0) return dayStart;

  const ratio = Math.min(1, Math.max(0, offsetY / height));
  const minute = dayStart + ratio * (dayEnd - dayStart);
  const rounded = dayStart + Math.round((minute - dayStart) / interval) * interval;
  return Math.min(dayEnd - interval, Math.max(dayStart, rounded));
}

export function formatCalendarTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}
