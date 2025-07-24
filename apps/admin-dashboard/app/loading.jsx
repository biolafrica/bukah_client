'use client'

import LoadingSpinner from "./components/common/loadingSpinner"

export default function Loading() {
  return (
    <div className="flex items-center justify-center p-10">
      <LoadingSpinner />
    </div>
  )
}

