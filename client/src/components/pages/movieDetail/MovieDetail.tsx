import { useGetStaffQuery } from '../../services/kinopoisk';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../../ui/errorMessage/ErrorMessage';
import { useGetFilmQuery, useGetUserFilmFlagQuery, useSendFilmsMutation } from '../../services/films';
import { useGetMovieReviewsQuery } from '../../services/review';
import MovieReviewPart from './MovieReviewPart';
import MovieFlags from './MovieFlags';
import { MovieInfo } from './MovieInfo';
import MovieDetailScore from './MovieDetailScore';
import { useEffect, useState } from 'react';

interface Flags {
  isWatched: boolean;
  favorite: boolean;
}

const MovieDetail: React.FC = () => {

  const {filmId} = useParams<{filmId: string}>();
  const kinopoiskId = Number(filmId);

  const [send] = useSendFilmsMutation();

  const { data: filmDetail, error: filmDetailError, isLoading: isFilmDetailLoading} = useGetFilmQuery(kinopoiskId);
  const { data: staff = [], isLoading: isStaffLoading} = useGetStaffQuery(kinopoiskId);
  const { data: dataFlag, error: dataError, isLoading: isLoadingFlag, isSuccess: isSuccessFlag } = useGetUserFilmFlagQuery(kinopoiskId);
  const { data: movieReviews = [], isLoading: isLoadingReviews} = useGetMovieReviewsQuery(kinopoiskId)

  const [flags, setFlag] = useState<Flags>({isWatched: false, favorite: false})
  const [rate, setRate] = useState<number>(0)

  useEffect(() => {
    if (dataFlag && isSuccessFlag) {
      const { isWatched = false, favorite = false, rating = 0} = dataFlag;
      setFlag({isWatched, favorite})
      setRate(rating)
    }
  }, [dataFlag, isSuccessFlag])

  const rateHandler = async (value: number) => {

    setRate(value);

    try {
      await send({
        kinopoiskId,
        rating: value});
    } catch (error) {
        console.log(`Установка рейтинга вызвала какую-то ошибку ${error}`)
     }

  }

  const flagHandler = async (typeFlag : "isWatched" | "favorite") => {

    const newValue = !flags[typeFlag];
    const newFlags = {...flags, [typeFlag] : newValue};
    setFlag(newFlags);

    try {
      await send({
        kinopoiskId,
        isWatched: newFlags.isWatched,
        favorite: newFlags.favorite});
    } catch (error) {
        console.log(`Установка флага вызвала какую-то ошибку ${error}`)
     }

  }

  if (isFilmDetailLoading || isStaffLoading || isLoadingReviews || isLoadingFlag) return <div>Is Loading...</div>
  if (filmDetailError || dataError) return <ErrorMessage />
  if (!filmDetail) return <div>Films isnt exist...</div>

  return (
    <div className='m-auto w-[80vw] mt-10'>
      <div className='grid grid-cols-1 md:grid-cols-[50%_50%] border-b-2 p-3 text-center'>
        <div className="md:border-r-2 flex flex-col justify-start items-center ">
          <img alt={filmDetail.nameRu || 'Постер фильма'} width="60%" className="shadow-2xl mb-5" src={filmDetail.posterUrl ?? undefined}/>
          <h1 className="text-5xl mb-5 font-jura tracking-tighter ">{filmDetail.nameRu}</h1>
          <div className="font-jura tracking-tighter text-xl">
              {
                (filmDetail.genres ?? []).map(g => g.genre).join(", ")
              }
          </div>
          <div className="font-jura tracking-tighter text-xl">
              {(filmDetail.countries ?? []).map(g => g.country).join(", ")}
          </div>
          <div className="font-jura tracking-tighter text-xl mb-3">
            { filmDetail.filmLength !== 0 && `${filmDetail.filmLength} мин.`}
          </div>
          <MovieFlags flags={flags} flagHandler={flagHandler}/>
          <MovieDetailScore rate={rate} rateHandler={rateHandler}/>
        </div>
        <MovieInfo filmDetail={filmDetail} staff={staff}/>
      </div>
      <MovieReviewPart movieReviews={movieReviews} />
    </div>
  )
}

export default MovieDetail