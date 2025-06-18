import { useGetUserFilmWithFavoriteQuery } from '../../../../services/films'
import FavoriteFilm from './FavoriteFilm'
import { Link } from 'react-router-dom'

const FavoriteList = ({userId}) => {
  
  const {data, isLoading} = useGetUserFilmWithFavoriteQuery(userId, {skip: !userId})

  if (isLoading) return <div>Загрузка...</div>
  return (
    <div>
      {!data && 
        <div>
          <p>У этого пользователя нет любимых фильмов</p>
        </div>
      }
      {data.length && 
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