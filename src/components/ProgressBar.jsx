// src/components/ProgressBar.jsx
import React from 'react'

const ProgressBar = ({ percent }) => {
  return (
    <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
      <div
        className="h-full bg-[var(--color-success)]"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}

export default ProgressBar
