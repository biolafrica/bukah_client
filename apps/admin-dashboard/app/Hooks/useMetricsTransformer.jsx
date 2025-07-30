import { useState, useMemo } from "react";
import { formatNaira, formatNumber } from "../utils/format";

export function useMetricTransformer(rawData, { formatStrategy = "number" } = {}) {
  const [range, setRange] = useState("today");

  const getFormatFn = (label) => {
    if (typeof formatStrategy === "function") {
      return formatStrategy(label);
    }

    if (formatStrategy === "naira") return formatNaira;
    if (formatStrategy === "number") return formatNumber;

    // "auto" or fallback
    return label.toLowerCase().includes("transaction") ? formatNaira : formatNumber;
  };

  const metrics = useMemo(() => {
    if (!rawData) return [];

    return Object.entries(rawData).map(([label, periods]) => {
      const window = periods?.[range] ?? { current: 0, previous: 0 };
      const { current, previous } = window;
      const diff = current - previous;
      const pct = previous > 0 ? (diff / previous) * 100 : 0;

      const formatFn = getFormatFn(label);

      return {
        label,
        value: formatFn(current),
        percentage: `${diff >= 0 ? "+" : ""}${pct.toFixed(2)}%`,
        comparison:
          range === "today"
            ? "vs yesterday"
            : range === "last7"
            ? "vs prior 7 days"
            : "vs prior 30 days",
        trend: diff >= 0 ? "up" : "down",
      };
    });
  }, [rawData, range, formatStrategy]);

  return { metrics, range, setRange };
}
