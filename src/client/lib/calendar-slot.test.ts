import assert from "node:assert/strict";
import { test } from "node:test";
import { calendarSlotMinutes, formatCalendarTime } from "./calendar-slot.ts";

test("calendar clicks round to the nearest 15-minute slot", () => {
  const dayStart = 7 * 60;
  const dayEnd = 21 * 60;
  const height = 14 * 64;
  const tenSeventeenOffset = ((10 * 60 + 17 - dayStart) / (dayEnd - dayStart)) * height;

  assert.equal(calendarSlotMinutes(tenSeventeenOffset, height, dayStart, dayEnd), 10 * 60 + 15);
  assert.equal(formatCalendarTime(10 * 60 + 15), "10:15");
});

test("calendar clicks stay inside the visible booking day", () => {
  const dayStart = 7 * 60;
  const dayEnd = 21 * 60;

  assert.equal(calendarSlotMinutes(-50, 896, dayStart, dayEnd), dayStart);
  assert.equal(calendarSlotMinutes(1000, 896, dayStart, dayEnd), dayEnd - 15);
  assert.equal(formatCalendarTime(dayEnd - 15), "20:45");
});

test("a collapsed calendar safely falls back to opening time", () => {
  assert.equal(calendarSlotMinutes(100, 0, 420, 1260), 420);
});
