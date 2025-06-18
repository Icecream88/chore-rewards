// src/components/RewardCard.jsx
import React, { useState } from 'react'

const RewardCard = ({ reward, onRedeem }) => {
  const [isPopping, setIsPopping] = useState(false)

  const handleRedeemClick = () => {
    onRedeem()
    setIsPopping(true)
    setTimeout(() => setIsPopping(false), 300)
  }

  // Build icon URL using Vite import.meta.url
  const iconUrl = new URL(`../assets/icons/${reward.icon}`, import.meta.url).href

  return (
    <div className={`card flex flex-col items-start space-y-4 transition-shadow hover:shadow-lg ${isPopping ? 'animate-pop' : ''}`}>
      {/* Colored icon block */}
      <div className={`${reward.bgClass} p-6 rounded-lg w-full flex justify-center`}>  
        <img src={iconUrl} alt={reward.title} className="w-8 h-8" />
      </div>

      <h3 className="text-lg font-semibold text-[var(--color-secondary)]">{reward.title}</h3>

      <div className="flex justify-between w-full">
        <span className="text-[var(--color-yellow)] font-medium">{reward.coins} coins</span>
        {reward.tag && <span className="text-sm text-gray-500">{reward.tag}</span>}
      </div>

      <button
        onClick={handleRedeemClick}
        className="btn-primary w-full active:scale-95 active:shadow-inner"
      >
        Redeem
      </button>
    </div>
  )
}

export default RewardCard
