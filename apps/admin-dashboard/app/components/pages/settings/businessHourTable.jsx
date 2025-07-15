import { useState } from "react"
import Switch from "../../uiComponents/switch"

export function DaySchedule({ day, enabled, from, to, onChange }) {
  const [isEnabled, setIsEnabled] = useState(enabled)
  const [fromTime, setFromTime] = useState(from || '')
  const [toTime, setToTime] = useState(to || '')

  const handleToggle = state => {
    setIsEnabled(state)
    onChange(day, { enabled: state, from: fromTime, to: toTime })
  }
  const handleFrom = e => {
    const value = e.target.value
    setFromTime(value)
    onChange(day, { enabled: isEnabled, from: value, to: toTime })
  }
  const handleTo = e => {
    const value = e.target.value
    setToTime(value)
    onChange(day, { enabled: isEnabled, from: fromTime, to: value })
  }

  return (
    <div className="md:flex md:items-center md:justify-between mb-4">
      <div className="md:w-1/3 flex items-center gap-5 mb-1">
        <Switch initial={()=>isEnabled} onChange={handleToggle} />
        <h4 className="text-base font-medium">{day}</h4>
      </div>
      <div className="md:w-2/3 mb-1">
        {isEnabled ? (
          <div className="flex items-center gap-4">
            <div className="w-1/2 flex items-center justify-between border border-border-text rounded-md p-2">
              <h4 className="text-sec-text text-sm">From</h4>
              <input type="time" value={fromTime} onChange={handleFrom} className="outline-0" />
            </div>
            <div className="w-1/2 flex items-center justify-between border border-border-text rounded-md p-2">
              <h4 className="text-sec-text text-sm">To</h4>
              <input type="time" value={toTime} onChange={handleTo} className="outline-0" />
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="w-full text-center border border-border-text rounded-md p-2 text-sec-text bg-gray-100"
          >
            Closed
          </button>
        )}
      </div>
    </div>
  )
}

export default function WeeklySchedule({ initialSchedules, onSave }) {
  const [schedules, setSchedules] = useState(initialSchedules)

  const handleChange = (day, data) => {
    setSchedules(prev =>
      prev.map(item => (item.day === day ? { ...item, ...data } : item))
    )
  }

  const handleSave = () => {
    onSave(schedules)
  }

  return (
    <div>
      {schedules.map(item => (
        <DaySchedule
          key={item.day}
          day={item.day}
          enabled={item.enabled}
          from={item.from}
          to={item.to}
          onChange={handleChange}
        />
      ))}
      <button
        type="button"
        onClick={handleSave}
        className="btn btn-filled mt-6 w-full"
      >
        Save Changes
      </button>
    </div>
  )
}