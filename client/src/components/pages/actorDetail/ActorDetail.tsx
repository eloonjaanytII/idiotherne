import { Link, useParams } from 'react-router-dom'
import { useGetActorDetailQuery } from '../../services/kinopoisk';
import ErrorMessage from '../../ui/errorMessage/ErrorMessage';

type Params = {
  id: string;
};

const ActorDetail = () => {

  const {id} = useParams<Params>();

  if (!id) return <div>Invalid actor ID</div>;

  const {data, isLoading, isSuccess, error} = useGetActorDetailQuery(Number(id));

  if (isLoading || !isSuccess) return <div>Is Loading...</div>
  if (error) return <ErrorMessage />

  const filteredFilms = data.films.filter((film, index, self) =>index === self.findIndex(f => f.filmId === film.filmId)).filter(film => film.nameRu)

  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-3 justify-center items-center'>
      <div className=''>
        <img src={data.posterUrl ?? undefined} alt="pikcha" className='m-auto'/>
      </div>
      <div className='grid grid-rows-6 max-h-[50vh] mt-15 text-lg gap-2 m-auto mb-10 p-2'>
        <div className='grid grid-cols-2'>
          <p>Полное имя:</p>
          <p className=''>{data.nameRu}</p>
        </div>
        <div className='grid grid-cols-2'>
          <p>Профессия:</p>
          <p>{data.profession}</p>
        </div>
        <div className='grid grid-cols-2'>
          <p>Место рождения:</p>
          <p>{data.birthplace}</p>
        </div>
        <div className='grid grid-cols-2'>
          <p>Дата рождения:</p>
          <p>{data.birthday}</p>
        </div>
        <div className='grid grid-cols-2'>
          <p>Возраст:</p>
          <p>{data.age}</p>
        </div>
        <div className='grid grid-cols-2'>
          <p>Количество наград:</p>
          <p>{data.hasAwards}</p>
        </div>
      </div>
      <div className='flex flex-col justify-start'>
        <p className='text-2xl mb-4 text-center'>Фильмы:</p>
        <div className='flex flex-col overflow-y-auto pr-2 gap-2 max-h-[30vh] md:max-h-[80vh] scrollbar-review'>
          {filteredFilms.map((film, idx)=> (
            <Link key={film.filmId} to={`/movies/${film.filmId}`}>
              <div className='w-[100%] min-h-15 flex justify-between items-center border-2 bg-base-300 rounded-md p-4 hover:bg-accent hover:text-white hover:scale-99 transition-transform duration-200'>
                <div>
                  {idx+1}.
                </div>
                <div className='flex flex-col justify-center text-end '>
                    <p className="text-lg">{film.nameRu}</p>
                </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ActorDetail