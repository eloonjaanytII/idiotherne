import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';

const MovieCard = ({item}) => {
  
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
      <Link to={`${item.kinopoiskId}`} 
            className="flex flex-col items-center text-center card shadow-md w-[100%] h-[40vh] md:h-[100%] md:w-full m-auto 
                       transition-transform duration-400 hover:scale-103 bg-orange-200 pb-5 border-1 md:border-0 text-orange-900 " 
            key={item.title}>
        <figure className="relative w-[95%] min-h-[80%] md:h-[300px] overflow-hidden rounded-md">
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton rounded-md" />
          )}
          <img
            src={item.posterUrlPreview}
            alt={item.nameOriginal}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-contain rounded-lg shadow transition-opacity duration-500 mt-5 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-[0.8rem] md:text-xl mb-0 mt-0">{item.nameRu || item.nameOriginal} </h2>
        </div>
      </Link>
  )
}

export default MovieCard