import React from "react"

interface FavoriteFilmProps {
  nameRu: string | null;
  posterUrl: string | null;
  idx: number;
}

const FavoriteFilm: React.FC <FavoriteFilmProps> = ({nameRu, posterUrl, idx}) => {

  return (
    <div className='w-[100%] h-15 text-black flex justify-between items-center border-2 border-base-200 bg-orange-300 rounded-md pl-4 hover:bg-accent hover:scale-99 transition-transform duration-200'>
        <div>
          {idx}.
        </div>
        <div className='flex flex-col justify-center text-center'>
            <p className="text-lg">{nameRu || "Неизвестное название"}</p>
        </div>
        <div className="h-15 max-w-10 min-w-10 p-[0.2rem]">
          <img src={posterUrl ?? undefined} alt="film" className='h-full w-full object-cover rounded-md'/>
        </div>
    </div>
  )
}

export default FavoriteFilm