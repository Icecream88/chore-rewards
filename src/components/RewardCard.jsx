// src/components/RewardCard.jsx
import React from 'react'

const RewardCard = ({ reward, onRedeem }) => {
  // Build a URL to the SVG using import.meta.url
  const iconUrl = new URL(`../assets/icons/${reward.icon}`, import.meta.url).href

  return (
    <div className="card flex flex-col items-start space-y-4">
      {/* Colored icon block */}
      <div className={`${reward.bgClass} p-6 rounded-lg w-full flex justify-center`}>
        <img src={iconUrl} alt={reward.title} className="w-8 h-8" />
      </div>

      <h3 className="text-lg font-semibold">{reward.title}</h3>

      <div className="flex justify-between w-full">
        <span className="text-[var(--color-yellow)] font-medium">
          {reward.coins} coins
        </span>
        {reward.tag && (
          <span className="text-sm text-gray-500">{reward.tag}</span>
        )}
      </div>

      <button
        onClick={onRedeem}
        className="btn-primary w-full"
      >
        Redeem
      </button>
    </div>
  )
}

export default RewardCard
