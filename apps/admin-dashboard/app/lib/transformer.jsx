import { format } from "date-fns"
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

export function transformBranchList(raw){
  return{
    id: raw.id,
    name: `${raw.first_name} ${raw.last_name}`,
    role: raw.role,
    countText: `last login ${format(new Date(raw.last_login), 'dd-MM-yyyy')}|${format(new Date(raw.last_login), 'hh:mm a')}`
  }

}

export function transformSession(raw){
  return{
    id: raw.id,
    date: format(new Date(raw.created_at),'dd-MM-yyyy'),
    clockIn: format(new Date(raw.clock_in_time),'hh:mm a'),
    clockOut: format(new Date(raw.clock_out_time),'hh:mm a'),
    totalOrder:formatNumber(raw.total_orders), 
    totalAmount: formatNumber(raw.total_earned),
  }

}

