import React from 'react'

const MovieFlags = ({flags, handleToggle }) => {
  return (
    <div className='flex gap-2 md:gap-5 justify-between'>
        <div 
        className={`hover:bg-gray-400 ${flags.isWatched ? "" : "active"} button-film cursor-pointer `}
        onClick={() => handleToggle('isWatched')}>
        {flags.isWatched ? "Просмотрено" : "Просмотреть"}</div>
        <div 
        className={`hover:bg-gray-400 ${flags.isFavorite ? "" : "active"} button-film cursor-pointer mb-4`}
        onClick={() => handleToggle('isFavorite')}>
        {flags.isFavorite ? "В избранном" : "В избранное"}</div>
    </div>
  )
}

export default MovieFlags