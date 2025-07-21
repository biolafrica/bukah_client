import { formatNaira } from "../utils/format"

export function transformTable(raw) {
  return {
    id:     raw.id,
    name:   raw.name,
    head:   `${raw.capacity} seater – ${raw.type}`,
    subHead:`Service charge ${formatNaira(raw.service_charge)}`,
  }
}
