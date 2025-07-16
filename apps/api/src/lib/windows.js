import {subDays } from 'date-fns'

export function buildWindows(todayStart) {
  const make = days => ({
    current:{from: subDays(todayStart, days), to: days === 0 ? subDays(todayStart, -1): todayStart },

    previous: {from: days === 0 ? subDays(todayStart, 1) : subDays(todayStart, days * 2),
    to: days === 0 ? todayStart : subDays(todayStart, days) }
  })

  return {
    today:  make(0),
    last7:  make(7),
    last30: make(30)
  }
}