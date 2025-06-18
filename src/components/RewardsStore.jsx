// src/components/RewardsStore.jsx
import React, { useState } from 'react'
import SortFilter from './SortFilter'
import RewardCard from './RewardCard'
import { useAuth } from '../contexts/AuthContext'

const RewardsStore = ({ rewards, onRedeem }) => {
  const { viewMode } = useAuth()
  const [sortBy, setSortBy] = useState('Popular')

  // Sort logic based on selection
  const sorted = [...rewards].sort((a, b) => {
    if (sortBy === 'Price: low to high')   return a.coins - b.coins
    if (sortBy === 'Price: high to low')  return b.coins - a.coins
    if (sortBy === 'Newest')              return b.id - a.id
    return 0 // Popular or default
  })

  return (
    <div className="card space-y-4">
      {/* Header with conditional sort/filter */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Rewards Store</h2>
        {viewMode === 'parent' && (
          <SortFilter sortBy={sortBy} onSortChange={setSortBy} />
        )}
      </div>

      {/* Grid of reward cards with fade-in */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
        {sorted.map(reward => (
          <RewardCard
            key={reward.id}
            reward={reward}
            onRedeem={() => onRedeem(reward.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default RewardsStore
