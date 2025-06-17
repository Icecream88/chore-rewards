// src/components/ChoresPanel.jsx
import React from 'react'
import ProgressBar from './ProgressBar'
import ChoreItem   from './ChoreItem'
import AddChore    from './AddChore'
import { useAuth } from '../contexts/AuthContext'

const ChoresPanel = ({ chores, onToggle, onAdd, onClear }) => {
  const { viewMode } = useAuth()

  const doneCount   = chores.filter(c => c.done).length
  const totalCount  = chores.length
  const percentDone = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0

  return (
    <div className="card flex flex-col h-[600px] space-y-4">
      {/* Header with optional Clear All */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Today's Chores</h2>
        {viewMode === 'parent' && (
          <button onClick={onClear} className="text-red-600 hover:underline text-sm">
            Clear All
          </button>
        )}
      </div>

      {/* Progress section */}
      <div>
        <ProgressBar percent={percentDone} />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>{percentDone}% completed</span>
          <span>{doneCount} of {totalCount} tasks</span>
        </div>
      </div>

      {/* Scrollable chore list */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {totalCount > 0 ? (
          chores.map(chore => (
            <ChoreItem
              key={chore.id}
              chore={chore}
              onToggle={() => onToggle(chore.id)}
            />
          ))
        ) : (
          <p className="text-gray-500">No chores yet. Add one below!</p>
        )}
      </div>

      {/* Add Chore button for parent only */}
      {viewMode === 'parent' && (
        <div className="mt-4">
          <AddChore onAdd={onAdd} />
        </div>
      )}
    </div>
  )
}

export default ChoresPanel
