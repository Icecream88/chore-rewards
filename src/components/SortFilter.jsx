import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

const SortFilter = ({ sortBy, onSortChange, /* filter, onFilterChange */ }) => {
  return (
    <div className="flex items-center space-x-4">
      <select
        value={sortBy}
        onChange={e => onSortChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1"
      >
        <option>Popular</option>
        <option>Newest</option>
        <option>Price: low to high</option>
        <option>Price: high to low</option>
      </select>

      {/* stubbed filter button */}
      <button
        onClick={() => alert('Filter panel coming soon!')}
        className="border border-gray-300 rounded px-3 py-1 inline-flex items-center"
      >
        Filter <ChevronDownIcon className="w-4 h-4 ml-1" />
      </button>
    </div>
  )
}

export default SortFilter
