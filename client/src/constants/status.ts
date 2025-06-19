import type { TStatus } from "../types.ts";

const STATUS_COLORS: Record<TStatus, string> = {
  Working: "#28a745",
  OnVacation: "#dc3545",
  LunchTime: "#ffc107",
  BusinessTrip: "#6f42c1",
};

const STATUS_LABELS: Record<TStatus, string> = {
  Working: "Working",
  OnVacation: "On Vacation",
  LunchTime: "Lunch Time",
  BusinessTrip: "Business Trip",
};

const statuses = Object.keys(STATUS_LABELS) as TStatus[];

export { STATUS_COLORS, STATUS_LABELS, statuses };
