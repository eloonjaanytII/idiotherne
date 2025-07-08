import { Link } from 'react-router-dom'
import { FilmData } from '../../services/types/films';
import { StaffPerson } from '../../services/types/kinopoisk';
import MoviePersonCard from './movieUI/MoviePersonCard';
import { memo, useMemo } from 'react';

interface MovieInfoProps {
  filmDetail: FilmData;
  staff: StaffPerson[];
}

const MovieInfo: React.FC<MovieInfoProps> = ({filmDetail, staff}) => {

  const uniqueStaff = useMemo(() => staff.filter((el, index, self) => index === self.findIndex(d => d.staffId === el.staffId)), [staff]);

  return (
    <div>
          <div className="flex flex-col p-4 md:border-r-2 border-t-2 mt-3 md:mt-0">
            <p className='text-center font-semibold text-xl mb-3'>О фильме:</p>
            <p className='font-regular tracking-normal text-justify text-md'>{filmDetail.description}</p>
          </div>
          <div className="grid grid-cols-2 p-3 gap-3 font-regular tracking-normal border-b-2">
            <div>
              <p className='text-center font-semibold text-xl mb-3 mt-3'>Режиссёр:</p>
              {uniqueStaff.filter(actor => actor.professionText === 'Режиссеры').map(el => (
                  <Link to={`/actor/${el.staffId}`} key={`${el.staffId}-${el.professionText}`}>
                    <MoviePersonCard posterUrl={el.posterUrl} nameRu={el.nameRu}/>
                  </Link>
                ))
              }
            </div>
            <div className="">
              <p className='text-center font-semibold text-xl mb-3 mt-3'>Оператор:</p>
              {uniqueStaff.filter(actor => actor.professionText === 'Операторы').map(el => (
                  <Link to={`/actor/${el.staffId}`} key={`${el.staffId}-${el.professionText}`}>
                    <MoviePersonCard posterUrl={el.posterUrl} nameRu={el.nameRu}/>
                  </Link>
                ))
              }
            </div>
          </div>
          <div className='p-3 font-regular tracking-normal'>
            <p className='text-center font-semibold text-2xl mb-3 mt-3'>В главных ролях:</p>
            <ul className='grid grid-cols-2 gap-3'>
              {uniqueStaff.filter(actor => actor.professionText === 'Актеры' && actor.nameRu).slice(0, 10)
                .map(el => (
                  <li key={`${el.staffId}-${el.professionText}`}>
                     <Link to={`/actor/${el.staffId}`}>
                        <MoviePersonCard posterUrl={el.posterUrl} nameRu={el.nameRu}/>
                      </Link>
                  </li>
                 
                ))
              }
            </ul>
          </div>
        </div>
  )
}

export default memo(MovieInfo);