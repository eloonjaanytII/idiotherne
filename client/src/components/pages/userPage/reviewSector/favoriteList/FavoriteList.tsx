import { useGetUserFilmWithFavoriteQuery } from '../../../../services/films'
import FavoriteFilm from './FavoriteFilm'
import { Link } from 'react-router-dom'



const FavoriteList: React.FC <{userId: number}>= ({userId}) => {
  
  const {data, isLoading} = useGetUserFilmWithFavoriteQuery(userId, {skip: !userId})

  if (isLoading || !data) return <div>Загрузка...</div>

  return (  
    <div>
      {data.length === 0 
      ? 
        <div>
          <p>У этого пользователя нет любимых фильмов</p>
        </div>
      :
        <div className="flex flex-col gap-2 overflow-y-auto pr-2 max-h-[500px] scrollbar-review">
          {data.map((el, idx) => (
              <Link key={el.kinopoiskId} to={`/movies/${el.kinopoiskId}`}>
                  <FavoriteFilm key={el.kinopoiskId} nameRu={el.nameRu} idx={idx+1} posterUrl = {el.posterUrl}/>
              </Link>
          ))}
        </div>
      }
    </div>
  )
}

export default FavoriteList