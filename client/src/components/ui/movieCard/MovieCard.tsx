import { Link } from 'react-router-dom'
import { memo, useState } from 'react';
import { FilmItem } from '../../services/types/kinopoisk';

const MovieCard: React.FC <{item: FilmItem}> = ({item}) => {
  
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  
  return (
      <Link to={`${item.kinopoiskId}`} 
            className="flex flex-col items-center text-center card shadow-md w-full h-[40vh] md:h-[100%] m-auto 
                       transition-transform duration-400 hover:scale-103 bg-orange-200 pb-5 border-1 md:border-0 text-orange-900 " 
            key={item.kinopoiskId}>
        <figure className="relative w-[90%] h-[70%] rounded-md">
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton rounded-md" />
          )}
          <div className='h-full w-full'>
            <img
            src={item.posterUrlPreview ?? undefined}
            alt={item.nameOriginal || 'preview'}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover rounded-lg shadow transition-opacity duration-500 mt-5 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          </div>
          
        </figure>
        <div className="card-body">
          <h2 className="card-title text-[0.8rem] md:text-xl mb-0 mt-0">{item.nameRu || item.nameOriginal} </h2>
        </div>
      </Link>
  )
}

export default memo(MovieCard);