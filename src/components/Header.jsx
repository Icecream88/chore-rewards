// src/components/Header.jsx
import React from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import coinIconUrl from '../assets/icons/CoinIcon.svg'

const Header = ({ coinBalance }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">ChoreRewards</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
            <img src={coinIconUrl} alt="Coin" className="w-5 h-5" />
            {coinBalance} coins
          </div>
          <UserCircleIcon className="w-8 h-8 text-gray-400" />
        </div>
      </div>
    </header>
  )
}

export default Header
