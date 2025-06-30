import React from 'react'
import ReadOnlyRating from './ReadOnlyRating'

interface ScoreFilmProps {
  nameRu: string | null;
  posterUrl: string | null;
  rating: number;
  idx: number;
}

const ScoreFilm: React.FC <ScoreFilmProps> = ({nameRu, rating, posterUrl, idx}) => {

  const getRatingColor = (rating : number) => {
    if (rating > 8) return 'bg-green-400';
    if (rating > 4) return 'bg-orange-400';
    if (rating < 4) return 'bg-red-400';
    return 'bg-white';
};

  return (
    <div className={`
    w-[100%] min-h-15 flex justify-between items-center
    border-1 border-black rounded-md pl-4 gap-2
    ${getRatingColor(rating)}
    text-black
    hover:bg-accent hover:scale-99 
    transition-transform duration-200`}>
        <div className='mr-2'>
          {idx}.
        </div>
        <div className='flex-1 flex items-center justify-between gap-2 mr-2'>
            <div className='text-center'>
                <p className="text-lg">{nameRu}</p>
            </div>
            <div className='flex justify-center'>
                <ReadOnlyRating rating={rating} />
            </div>
        </div>
        <div className='h-15 min-w-10 max-w-10 p-1 md:flex justify-end md:ml-5 hidden'>
          <img src={posterUrl ?? undefined} alt="film" className='h-full w-full object-cover rounded-sm'/>
        </div>

    </div>
  )
}

export default ScoreFilm