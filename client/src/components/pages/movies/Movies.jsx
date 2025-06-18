import useMovieQuery from '../../hooks/useMovieQuery'
import BearCarousel, {BearSlideImage} from 'bear-react-carousel';
import { Link, Outlet } from 'react-router-dom';
import ErrorMessage from '../../ui/errorMessage/ErrorMessage';

const Movies = () => {
  
  const {isLoading,
         hasError,
         responsePopular,
         responseBest,
         responseFilms,
         responseSerial,
         responseCartoons} = useMovieQuery();

  const sequelizeMovies = data => {

    if (!data) return <div>Нет данных</div>
    return data.map(row => (
      <Link key={row.kinopoiskId} to={`/movies/${row.kinopoiskId}`}>
        <BearSlideImage imageUrl={row.posterUrl} />
      </Link>
    )
    );
  }
  if (isLoading) return <div>Загрузка...</div>;
  if (hasError) return <ErrorMessage />;

  const carouselArr = [
    {
      title: 'Популярные фильмы',
      url: 'popular',
      data: sequelizeMovies(responsePopular.data.items),
    },
    {
      title: 'Лучшие фильмы',
      url: 'best',
      data: sequelizeMovies(responseBest.data.items),
    },
    {
      title: 'Фильмы',
      url: 'films',
      data: sequelizeMovies(responseFilms.data.items),
    },
    {
      title: 'Сериалы',
      url: 'serials',
      data: sequelizeMovies(responseSerial.data.items),
    },
    {
      title: 'Мультфильмы',
      url: 'cartoons',
      data: sequelizeMovies(responseCartoons.data.items),
    },
  ]

  return (
    <div className='m-auto max-w-3xl flex flex-col gap-y-2'>
      {carouselArr.map(item => (
        <div className='flex flex-col items-center gap-y-6' key = {item.title}>
          <h1 className='text-3xl'>{item.title}</h1>
          <BearCarousel
            slidesPerView = {1}
            slidesPerGroup={1}
            moveTime={800}
            isEnableLoop
            isEnableNavButton
            spaceBetween = {5}
            breakpoints= {{
              768: {
                slidesPerView: 5
              }
            }
            }
            data={item.data}
            className='hover:scale-110 transition-transform duration-500 mb-2'
          />
        </div>
      )
  )}
      <div className="mt-8">
          <Outlet />
      </div>
  </div>
  )

}

export default Movies