'use client'

import * as outline from '@heroicons/react/24/outline';

export default function Error({ error, reset }) {
  return (
    <div className="p-10 text-center">
      <outline.NoSymbolIcon className="mx-auto h-12 w-12 text-red-500" />
      <h2 className="mt-4 text-xl font-semibold text-red-600">Oops — something went wrong</h2>
      <p className="mt-2 text-gray-500">{error.message}</p>
      <button
        className="mt-6 btn btn-filled"
        onClick={() => {
          reset() 
        }}
      >
        Try again
      </button>
    </div>
  )
}
