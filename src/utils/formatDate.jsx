import React from "react";
import { Clock, CalendarDays } from "lucide-react";

export function formatDate(isoString) {
  if (!isoString) return "—";

  const date = new Date(isoString);
  const formattedDate = date.toISOString().split("T")[0]; // e.g., "2025-04-14"
  const formattedTime = date.toTimeString().split(" ")[0]; // e.g., "00:54:20"

  return (
    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
    <CalendarDays size={16} color="#2563EB" />
      {formattedDate}
      <br />
      <Clock size={16} color="#2563EB" />
      {formattedTime}
    </span>
  );
}
