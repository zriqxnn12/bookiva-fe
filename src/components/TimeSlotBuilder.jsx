import { ChevronDown, ChevronUp, Clock, Plus, X } from "lucide-react";
import React, { useState } from "react";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DAY_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const EMPTY_SLOT = {
  day_of_week: 1,
  start_time: "08:00",
  end_time: "09:00",
};

export default function TimeSlotBuilder({ slots, onChange }) {
  const [expanded, setExpanded] = useState(true);

  const addSlot = () => onChange([...slots, { ...EMPTY_SLOT }]);

  const updateSlot = (idx, field, value) => {
    const next = slots.map((s, i) =>
      i === idx ? { ...s, [field]: value } : s,
    );
    onChange(next);
  };

  const removeSlot = (idx) => onChange(slots.filter((_, i) => i !== idx));

  // group slots by day for the "day pills" preview
  const slotsByDay = DAYS.reduce((acc, day, i) => {
    acc[i + 1] = slots.filter((s) => Number(s.day_of_week) === i + 1);
    return acc;
  }, []);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Clock size={15} className="text-blue-500" />
          <span className="text-sm font-semibold text-slate-800">
            Time Slots
          </span>
          {slots.length > 0 && (
            <span className="text-xs font-medium bg-blue-100 text-blue-500 rounded-full px-2 py-1.5">
              {slots.length} slot{slots.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        {expanded ? (
          <ChevronUp size={15} className="text-slate-400" />
        ) : (
          <ChevronDown size={15} className="text-slate-400" />
        )}
      </button>

      {expanded && (
        <div className="p-4 space-y-3">
          {/* day pills overview */}
          {slots.length > 0 && (
            <div className="flex flex-wrap gap-1 p-1">
              {DAYS.map((day, i) => {
                const count = slotsByDay[i + 1]?.length || 0;

                return (
                  <span
                    key={day}
                    className={`text-xs px-2.5 py-1 font-medium rounded-full transition-colors ${
                      count > 0
                        ? "bg-blue-50 text-blue-500 border border-blue-200"
                        : "bg-slate-50 text-slate-400 border border-slate-200"
                    }`}
                  >
                    {DAY_SHORT[i]}
                    {count > 0 ? ` x${count}` : ""}
                  </span>
                );
              })}
            </div>
          )}

          {/* slot row */}
          {slots.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-3">
              No time slots yet. Add slots so customers can book this service
            </p>
          )}

          <div className="space-y-3">
            {slots.map((slot, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[1fr_100px_100px_auto] gap-2 items-center bg-slate-50 rounded-lg px-3 py-2.5 border border-slate-100"
              >
                {/* day */}
                <select
                  value={slot.day_of_week}
                  onChange={(e) =>
                    updateSlot(idx, "day_of_week", Number(e.target.value))
                  }
                  className="input text-sm py-1.5"
                >
                  {DAYS.map((d, i) => (
                    <option key={d} value={i + 1}>
                      {d}
                    </option>
                  ))}
                </select>

                {/* start */}
                <div className="relative">
                  <input
                    type="time"
                    value={slot.start_time}
                    onChange={(e) =>
                      updateSlot(idx, "start_time", e.target.value)
                    }
                    className="input w-full text-sm py-1.5"
                  />
                </div>

                {/* end */}
                <div className="relative">
                  <input
                    type="time"
                    value={slot.end_time}
                    onChange={(e) =>
                      updateSlot(idx, "end_time", e.target.value)
                    }
                    className="input w-full text-sm py-1.5"
                  />
                </div>

                {/* remove */}
                <button
                  type="button"
                  onChange={() => removeSlot(idx)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-slate-100 hover:text-red-400 transition-colors flex-shrink-0"
                >
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>

          {slots.length > 0 && (
            <div className="grid grid-cols-[1fr_100px_100px_auto] gap-2 px-3">
              <span className="text-xs text-slate-400">Day</span>
              <span className="text-xs text-slate-400">Start</span>
              <span className="text-xs text-slate-400">End</span>
            </div>
          )}

          <button
            type="button"
            onClick={addSlot}
            className="w-full text-xs flex items-center justify-center gap-1.5 text-blue-500 hover:text-blue-600 
            rounded-lg border border-dashed border-blue-200 hover:border-blue-400 
            transition-colors py-2 font-medium"
          >
            <Plus size={13} /> Add time slot
          </button>
        </div>
      )}
    </div>
  );
}
