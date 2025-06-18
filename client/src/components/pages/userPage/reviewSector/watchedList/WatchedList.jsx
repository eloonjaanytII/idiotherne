import WatchedFilm from './WatchedFilm'
import { Link } from 'react-router-dom'

const WatchedList = ({userFilms}) => {

  return (
    <div>
      {!userFilms && 
        <div>
          <p>У этого пользователя нет просмотренных фильмов</p>
        </div>
      }
      {userFilms && 
        <div className='flex flex-col gap-2 overflow-y-auto pr-2 max-h-[500px] scrollbar-review'>
            {userFilms.map((f, idx) => (
                <Link key={f.kinopoiskId || f.id} to={`/movies/${f.kinopoiskId}`}>
                  <WatchedFilm  nameRu = {f.nameRu} posterUrl = {f.posterUrl} year={f.year} idx = {idx+1}/>
                </Link>
            ))}
        </div>
      }
    </div>
  )
}

export default WatchedList