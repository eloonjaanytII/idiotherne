import React from 'react'

interface WatchedFilmProps {
  nameRu: string | null;
  posterUrl: string | null;
  year: number | null;
  idx: number;
}


const WatchedFilm: React.FC <WatchedFilmProps> = ({nameRu, posterUrl, year, idx}) => {

  return (
    <div className='w-[100%] min-h-15 flex justify-between items-center gap-4 border-1 border-neutral-content rounded-md pl-4 bg-base-300 hover:bg-accent hover:text-accent-content hover:scale-99 transition-transform duration-200'>
        <div>
          {idx}.
        </div>
        <div className='flex flex-col justify-center text-center'>
            <p className="text-lg">{nameRu}</p>
            <p className="text-xs">{year}</p>
        </div>
        <div className='h-15 max-w-10 min-w-10 rounded-xl p-1'>
          <img src={posterUrl ?? undefined} alt="film" className='w-full h-full object-cover rounded-sm'/>
        </div>
    </div>
  )
}

export default WatchedFilm