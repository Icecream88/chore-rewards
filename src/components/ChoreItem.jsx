// src/components/ChoreItem.jsx
import React from 'react'

const ChoreItem = ({ chore, onToggle }) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={chore.done}
          onChange={onToggle}
          className="h-4 w-4 text-[var(--color-primary)] border-gray-300 rounded"
        />
        <span className={chore.done ? 'line-through text-gray-500' : 'text-gray-900'}>
          {chore.title}
        </span>
      </label>
      <span className="text-[var(--color-yellow)] font-medium">
        {chore.coins} coins
      </span>
    </div>
  )
}

export default ChoreItem
