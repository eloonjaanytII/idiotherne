import React from 'react'
import ReadOnlyRating from './ReadOnlyRating'

const ScoreFilm = ({nameRu, rating, posterUrl, idx}) => {

  const getRatingColor = (rating) => {
    if (rating > 8) return 'bg-green-400';
    if (rating > 4) return 'bg-orange-400';
    if (rating < 4) return 'bg-red-400';
    return 'bg-white';
};

  return (
    <div className={`
    w-[100%] min-h-15 grid grid-cols-[10%_80%_10%] items-center justify-center
    border-1 border-black rounded-md pl-4 pr-2
    ${getRatingColor(rating)}
    text-black
    hover:bg-accent hover:scale-99 
    transition-transform duration-200`}>
        <div>
          {idx}.
        </div>
        <div className='grid grid-cols-2 gap-x-5 items-center'>
            <div className='text-center'>
                <p className="text-lg">{nameRu}</p>
            </div>
            <div className=''>
                <ReadOnlyRating rating={rating} />
            </div>
        </div>
        <div className='h-15 w-10 p-1 flex justify-end md:ml-5'>
          <img src={posterUrl} alt="film" className='h-full w-full object-cover rounded-sm'/>
        </div>

    </div>
  )
}

export default ScoreFilm