
import {useGetUserFilmWithScoresQuery } from '../../../../services/films'
import ScoreFilm from './ScoreFilm'
import { Link } from 'react-router-dom'

const ScoreList = ({userId}) => {

  const {data, isLoading} = useGetUserFilmWithScoresQuery(userId, {skip: !userId})

  if (isLoading) return <div>Загрузка...</div>
  return (
    <div className="flex flex-col gap-2 overflow-y-auto pr-2 max-h-[500px] scrollbar-review">
        {data.map((el, idx) => (
            <Link key={el.kinopoiskId} to={`/movies/${el.kinopoiskId}`}>
                <ScoreFilm key={el.kinopoiskId} nameRu={el.nameRu} rating={el.rating} idx={idx+1} posterUrl = {el.posterUrl}/>
            </Link>
        ))}
    </div>
  )
}

export default ScoreList