// src/components/Sidebar.jsx
import React from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import coinIconUrl from '../assets/icons/CoinIcon.svg'
import Stats from './Stats'
import { useAuth } from '../contexts/AuthContext'

const Sidebar = ({ stats, coinBalance, autoApprove, onToggleAutoApprove, history }) => {
  const { viewMode, setViewMode } = useAuth()

  return (
    <div className="space-y-6">
      {/* Dashboard card: fixed height, with view-mode selector */}
      <div className="card flex flex-col h-[600px] space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <InformationCircleIcon className="w-5 h-5 text-[var(--color-info)]" />
            <h2 className="text-xl font-semibold">Dashboard</h2>
          </div>
          <select
            value={viewMode}
            onChange={e => setViewMode(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="parent">Parent View</option>
            <option value="child">Child View</option>
          </select>
        </div>

        {/* Coin Balance */}
        <div className="bg-yellow-100 p-4 rounded-lg flex items-center justify-center mb-4">
          <img src={coinIconUrl} alt="Coin" className="w-6 h-6 text-[var(--color-yellow)]" />
          <span className="ml-2 text-3xl font-semibold text-[var(--color-yellow)]">
            {coinBalance}
          </span>
        </div>

        {/* Stats */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Stats</h3>
          <Stats stats={stats} />
        </div>

        {/* Redemption History: scrollable */}
        <div className="flex-1 overflow-y-auto">
          <h3 className="text-lg font-medium mb-2">Redeem History</h3>
          {history.length > 0 ? (
            <ul className="space-y-2">
              {history.map((entry, idx) => (
                <li key={idx} className="flex justify-between text-sm">
                  <span>{entry.title}</span>
                  <span className="text-gray-500">{entry.date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No redemptions yet.</p>
          )}
        </div>
      </div>

      {/* Auto-approve: only in parent view */}
      {viewMode === 'parent' && (
        <div className="card flex items-center justify-between">
          <span className="font-medium">Auto-approve</span>
          <label className="relative inline-block w-12 h-6">
            <input
              type="checkbox"
              className="toggle-input sr-only"
              checked={autoApprove}
              onChange={onToggleAutoApprove}
            />
            <span className="toggle-switch" />
          </label>
        </div>
      )}
    </div>
  )
}

export default Sidebar
