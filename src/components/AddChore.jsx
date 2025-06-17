// src/components/AddChore.jsx
import React from 'react'

const AddChore = ({ onAdd }) => {
  return (
    <button
      type="button"
      className="btn-primary w-full"
      onClick={onAdd}
    >
      + Add Chore
    </button>
  )
}

export default AddChore
