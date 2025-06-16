import React from 'react'

const WatchedFilm = ({nameRu, posterUrl, year, idx}) => {

  return (
    <div className='w-[100%] h-15 flex justify-between items-center border-1 border-neutral-content rounded-md pl-4 bg-base-300 hover:bg-accent hover:text-accent-content hover:scale-99 transition-transform duration-200'>
        <div>
          {idx}.
        </div>
        <div className='flex flex-col justify-center text-center'>
            <p className="text-lg">{nameRu}</p>
            <p className="text-xs">{year}</p>
        </div>
        <div className='h-15 rounded-xl p-1'>
          <img src={posterUrl} alt="film" className='w-full h-full object-cover rounded-sm'/>
        </div>
    </div>
  )
}

export default WatchedFilm