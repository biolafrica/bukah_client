"use client"

import { useState } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SalesGraph(){
  const [selectedMonth, setSelectedMonth] = useState("2024-01")

  const revenueData = {
    "2024-01": Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      revenue: Math.floor(Math.random() * 50000) + 20000 + (i % 7 === 0 || i % 7 === 6 ? -5000 : 0), // Lower on weekends
    })),

    "2024-02": Array.from({ length: 29 }, (_, i) => ({
      day: i + 1,
      revenue: Math.floor(Math.random() * 45000) + 25000 + (i % 7 === 0 || i % 7 === 6 ? -5000 : 0),
    })),

    "2024-03": Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      revenue: Math.floor(Math.random() * 55000) + 30000 + (i % 7 === 0 || i % 7 === 6 ? -5000 : 0),
    })),

    "2024-04": Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      revenue: Math.floor(Math.random() * 48000) + 28000 + (i % 7 === 0 || i % 7 === 6 ? -5000 : 0),
    })),

    "2024-05": Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      revenue: Math.floor(Math.random() * 52000) + 32000 + (i % 7 === 0 || i % 7 === 6 ? -5000 : 0),
    })),

    "2024-06": Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      revenue: Math.floor(Math.random() * 58000) + 35000 + (i % 7 === 0 || i % 7 === 6 ? -5000 : 0),
    })),

    "2024-07": Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      revenue: Math.floor(Math.random() * 60000) + 40000 + (i % 7 === 0 || i % 7 === 6 ? -5000 : 0),
    })),

    "2024-08": Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      revenue: Math.floor(Math.random() * 55000) + 38000 + (i % 7 === 0 || i % 7 === 6 ? -5000 : 0),
    })),

    "2024-09": Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      revenue: Math.floor(Math.random() * 50000) + 35000 + (i % 7 === 0 || i % 7 === 6 ? -5000 : 0),
    })),

    "2024-10": Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      revenue: Math.floor(Math.random() * 53000) + 37000 + (i % 7 === 0 || i % 7 === 6 ? -5000 : 0),
    })),

    "2024-11": Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      revenue: Math.floor(Math.random() * 65000) + 45000 + (i % 7 === 0 || i % 7 === 6 ? -5000 : 0),
    })),

    "2024-12": Array.from({ length: 31 }, (_, i) => ({
      day: i + 1,
      revenue: Math.floor(Math.random() * 70000) + 50000 + (i % 7 === 0 || i % 7 === 6 ? -5000 : 0),
    })),

  }

  const monthNames = {
    "2024-01": "January 2024",
    "2024-02": "February 2024",
    "2024-03": "March 2024",
    "2024-04": "April 2024",
    "2024-05": "May 2024",
    "2024-06": "June 2024",
    "2024-07": "July 2024",
    "2024-08": "August 2024",
    "2024-09": "September 2024",
    "2024-10": "October 2024",
    "2024-11": "November 2024",
    "2024-12": "December 2024",
  }

  const getCurrentMonthData = () => {
    return revenueData[selectedMonth] || []
  }

  const getTotalRevenue = () => {
    return getCurrentMonthData().reduce((sum, day) => sum + day.revenue, 0)
  }

  const getAverageRevenue = () => {
    const data = getCurrentMonthData()
    return data.length > 0 ? Math.round(getTotalRevenue() / data.length) : 0
  }

  return(
        <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Sales Revenue</CardTitle>
              <CardDescription>
                Daily revenue for {monthNames[selectedMonth]}
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">${getTotalRevenue().toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Daily Average</p>
                <p className="text-lg font-semibold text-blue-600">${getAverageRevenue().toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {Object.entries(monthNames).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getCurrentMonthData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={{ stroke: "#e5e7eb" }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#e5e7eb" }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                          <p className="font-medium">{`Day ${label}`}</p>
                          <p className="text-green-600 font-semibold">Revenue: ${payload[0].value?.toLocaleString()}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-revenue)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "var(--color-revenue)", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    
  )
}