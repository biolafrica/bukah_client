import { formatNaira } from "../utils/format"

export function transformTable(raw) {
  return {
    id:     raw.id,
    name:   raw.name,
    head:   `${raw.capacity} seater – ${raw.type}`,
    subHead:`Service charge ${formatNaira(raw.service_charge)}`,
  }
}

export function transformPos(raw) {
  return {
    id:     raw.id,
    name:   raw.name,
    head:   raw.pos_provider,
    subHead: raw.account_name,
  }
}

export function transformTerminal(raw) {
  return {
    id:     raw.id,
    name:   raw.name,
    head:   raw.branch.name,
    subHead: raw.ip_address,
  }
}
