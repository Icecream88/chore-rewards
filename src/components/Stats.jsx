// src/components/Stats.jsx
import React from 'react'
import {
  BoltIcon,
  SparklesIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

const Stats = ({ stats }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <SparklesIcon className="w-6 h-6 text-[var(--color-info)]" />
      <div>
        <p className="text-lg font-semibold">{stats.weeklyStreak} days</p>
        <p className="text-sm text-gray-500">Weekly Streak</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <BoltIcon className="w-6 h-6 text-[var(--color-success)]" />
      <div>
        <p className="text-lg font-semibold">{stats.completedToday}</p>
        <p className="text-sm text-gray-500">Chores Today</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <CurrencyDollarIcon className="w-6 h-6 text-[var(--color-primary)]" />
      <div>
        <p className="text-lg font-semibold">{stats.totalEarned} coins</p>
        <p className="text-sm text-gray-500">Total Earned</p>
      </div>
    </div>
  </div>
)

export default Stats
