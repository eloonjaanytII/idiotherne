import { Link } from 'react-router-dom'
import { FilmData } from '../../services/types/films';
import { StaffPerson } from '../../services/types/kinopoisk';

interface MovieInfoProps {
  filmDetail: FilmData;
  staff: StaffPerson[];
}

export const MovieInfo: React.FC<MovieInfoProps> = ({filmDetail, staff}) => {

  const uniqueStaff = staff.filter((el, index, self) => index === self.findIndex(d => d.staffId === el.staffId));

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
                        <div className='flex border-2 rounded-md justify-between items-center hover:bg-base-300 h-18 hover:scale-102 transition-transform duration-200 mb-2'>
                          <img 
                            src={typeof el.posterUrl === 'string' && el.posterUrl ? el.posterUrl : '/fallback.png'}
                            alt={el.nameRu || 'Персона'}
                            width="50rem" 
                            className='object-contain h-[90%] rounded-lg'/>
                          <p className='text-lg text-center mr-4'>{el.nameRu}</p>
                        </div>
                  </Link>
                ))
              }
            </div>
            <div className="">
              <p className='text-center font-semibold text-xl mb-3 mt-3'>Оператор:</p>
              {uniqueStaff.filter(actor => actor.professionText === 'Операторы').map(el => (
                  <Link to={`/actor/${el.staffId}`} key={`${el.staffId}-${el.professionText}`}>
                        <div className='flex border-2 rounded-md justify-between items-center hover:bg-base-300 h-18 hover:scale-102 transition-transform duration-200 mb-2'>
                          <img 
                            src={typeof el.posterUrl === 'string' && el.posterUrl ? el.posterUrl : '/fallback.png'}
                            alt={el.nameRu || 'Персона'}
                            width="50rem" 
                            className='object-contain h-[90%] rounded-lg'/>
                          <p className='text-lg text-center mr-4'>{el.nameRu}</p>
                        </div>
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
                        <div className='flex border-2 rounded-md justify-between items-center hover:bg-base-300 h-18 hover:scale-102 transition-transform duration-200'>
                          <img 
                            alt={el.nameRu || 'Персона'}
                            src={typeof el.posterUrl === 'string' && el.posterUrl ? el.posterUrl : '/fallback.png'}
                            width="50rem" className='pl-1 object-contain h-[90%] rounded-lg'/>
                          <p className='text-lg text-center mr-4'>{el.nameRu}</p>
                        </div>
                  </Link>
                  </li>
                 
                ))
              }
            </ul>
          </div>
        </div>
  )
}
