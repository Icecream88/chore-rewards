// src/App.jsx
import React, { useState, useEffect } from 'react'
import { useAuth } from './contexts/AuthContext'
import Header       from './components/Header'
import ChoresPanel  from './components/ChoresPanel'
import Sidebar      from './components/Sidebar'
import RewardsStore from './components/RewardsStore'

// Helpers
const toDateString = date => date.toISOString().slice(0, 10)
const computeStreak = dates => {
  const set = new Set(dates)
  let streak = 0
  let current = new Date()
  while (set.has(toDateString(current))) {
    streak += 1
    current.setDate(current.getDate() - 1)
  }
  return streak
}

// Initial rewards data
const initialRewards = [
  { id: 1, title: '30 Minutes of Gaming',  coins: 50,  tag: 'Most popular',   icon: 'GameIcon.svg',     bgClass: 'bg-light-blue'  },
  { id: 2, title: 'Movie Night Pick',      coins: 100, tag: 'New',            icon: 'MovieIcon.svg',    bgClass: 'bg-light-green' },
  { id: 3, title: '$5 Allowance',          coins: 150, tag: 'Popular',        icon: 'AllowanceIcon2.svg',bgClass: 'bg-light-purple'},
  { id: 4, title: 'Special Dessert',       coins: 75,  tag: 'Tasty!',         icon: 'DessertIcon.svg',  bgClass: 'bg-light-red'   },
  { id: 5, title: 'Stay Up Late (30 min)', coins: 60,  tag: 'Weekend only',   icon: 'ClockIcon.svg',    bgClass: 'bg-light-yellow'},
  { id: 6, title: 'Skip One Chore',        coins: 125, tag: 'Limited use',    icon: 'SkipIcon.svg',     bgClass: 'bg-light-blue'  },
  { id: 7, title: 'Small Toy/Gift',        coins: 200, tag: 'Premium',        icon: 'GiftIcon.svg',     bgClass: 'bg-light-pink'  },
  { id: 8, title: 'Restaurant Choice',     coins: 175, tag: 'Family night',   icon: 'RestaurantIcon.svg',bgClass: 'bg-light-orange'}
]

const App = () => {
  // Get user role from auth context
  const { role } = useAuth()

  // --- State & Persistence ---
  const [chores, setChores] = useState(() => {
    try { return JSON.parse(localStorage.getItem('chores')) || [] } catch { return [] }
  })
  const [completionDates, setCompletionDates] = useState(() => {
    try { return JSON.parse(localStorage.getItem('completionDates')) || [] } catch { return [] }
  })
  const [rewards] = useState(initialRewards)
  const [coinBalance, setCoinBalance] = useState(() => {
    return parseInt(localStorage.getItem('coinBalance'), 10) || 0
  })
  const [history, setHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('history')) || [] } catch { return [] }
  })
  const [autoApprove, setAutoApprove] = useState(false)

  // Persist data
  useEffect(() => { localStorage.setItem('chores', JSON.stringify(chores)) }, [chores])
  useEffect(() => { localStorage.setItem('completionDates', JSON.stringify(completionDates)) }, [completionDates])
  useEffect(() => { localStorage.setItem('coinBalance', coinBalance) }, [coinBalance])
  useEffect(() => { localStorage.setItem('history', JSON.stringify(history)) }, [history])

  // --- Handlers ---
  const handleToggle = id => {
    setChores(prev =>
      prev.map(c => {
        if (c.id !== id) return c
        const updated = { ...c, done: !c.done }
        // credit/debit balance
        if (updated.done) setCoinBalance(bal => bal + c.coins)
        else setCoinBalance(bal => bal - c.coins)
        // record streak date
        if (updated.done) {
          const today = toDateString(new Date())
          if (!completionDates.includes(today)) setCompletionDates(d => [...d, today])
        }
        return updated
      })
    )
  }

  const handleAdd = () => {
    const title = prompt('Chore title:'); if (!title) return
    const coins = parseInt(prompt('Coins reward (number):'), 10)
    if (isNaN(coins)) return alert('Please enter a valid number for coins.')
    setChores(prev => [...prev, { id: Date.now(), title, coins, done: false }])
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all chores?')) setChores([])
  }

  const handleToggleAutoApprove = () => setAutoApprove(prev => !prev)

  const handleRedeem = rewardId => {
    const reward = rewards.find(r => r.id === rewardId)
    if (!reward) return alert('Reward not found.')
    if (coinBalance < reward.coins) return alert('Not enough coins!')
    setCoinBalance(bal => bal - reward.coins)
    // add redemption to history
    setHistory(prev => [
      ...prev,
      { id: reward.id, title: reward.title, coins: reward.coins, date: toDateString(new Date()) }
    ])
    alert(`Redeemed "${reward.title}" for ${reward.coins} coins!`)
  }

  // --- Derived Data ---
  const doneCount = chores.filter(c => c.done).length
  const stats = {
    completedToday: doneCount,
    weeklyStreak:   computeStreak(completionDates),
    totalEarned:    coinBalance
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header coinBalance={coinBalance} />

      <main className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChoresPanel
              chores={chores}
              onToggle={handleToggle}
              onAdd={handleAdd}
              onClear={handleClearAll}
              role={role}
            />
          </div>
          <div className="lg:col-span-1">
            <Sidebar
              stats={stats}
              coinBalance={coinBalance}
              autoApprove={autoApprove}
              onToggleAutoApprove={handleToggleAutoApprove}
              history={history}
              role={role}
            />
          </div>
        </div>

        <RewardsStore
          rewards={rewards}
          onRedeem={handleRedeem}
        />
      </main>
    </div>
  )
}

export default App
