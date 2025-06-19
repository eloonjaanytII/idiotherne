
import { useGetStaffQuery } from '../../services/kinopoisk';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../../ui/errorMessage/ErrorMessage';
import { useGetFilmQuery, useGetUserFilmFlagQuery, useSendFilmsMutation } from '../../services/films';

import { useState } from 'react';
import { useEffect } from 'react';
import MovieDetailScore from './MovieDetailScore';
import { useGetMovieReviewsQuery } from '../../services/review';
import MovieReviewPart from './MovieReviewPart';
import MovieFlags from './MovieFlags';
import { MovieInfo } from './MovieInfo';

const MovieDetail = () => {

  const {filmId} = useParams();
  const [send] = useSendFilmsMutation();

  const { data: filmDetail, error: filmDetailError, isLoading: isFilmDetailLoading} = useGetFilmQuery(filmId);
  const { data: staff, error: staffError, isLoading: isStaffLoading} = useGetStaffQuery(filmId);
  const { data : dataFlag, isSuccess: isSuccessFlag } = useGetUserFilmFlagQuery(filmId);
  const { data: movieReviews, isLoading: isLoadingReviews} = useGetMovieReviewsQuery(filmId)

  const [flags, setFlags] = useState({isWatched: false, isFavorite: false})

  useEffect(() => {
    if (dataFlag && isSuccessFlag) {
      setFlags({
        isWatched: dataFlag.isWatched,
        isFavorite: dataFlag.favorite
      })
    }
  }, [isSuccessFlag, dataFlag])

  const handleToggle = (field) => {
    const newValue = !flags[field];
    const newFlags = { ...flags, [field]: newValue };
    setFlags(newFlags);

    try {
      send({
        kinopoiskId: filmId,
        isWatched: newFlags.isWatched,
        favorite: newFlags.isFavorite});
    } catch(e) {
      console.error(e)
    }};

  if (isFilmDetailLoading || isStaffLoading || isLoadingReviews) return <div>Is Loading...</div>
  if (filmDetailError || staffError) return <ErrorMessage />

  return (
    <div className='m-auto w-[80vw] mt-10'>
      <div className='grid grid-cols-1 md:grid-cols-[50%_50%] border-b-2 p-3 text-center'>
        <div className="md:border-r-2 flex flex-col justify-start items-center ">
          <img alt={filmDetail.kinopoiskId} width="60%" className="shadow-2xl mb-5" src={filmDetail.posterUrl}/>
          <h1 className="text-5xl mb-5 font-jura tracking-tighter ">{filmDetail.nameRu}</h1>
          <div className="font-jura tracking-tighter text-xl">
              {
                filmDetail.genres.map(g => g.genre).join(", ")
              }
          </div>
          <div className="font-jura tracking-tighter text-xl">
              {filmDetail.countries.map(g => g.country).join(", ")}
          </div>
          <div className="font-jura tracking-tighter text-xl mb-3">
            { filmDetail.filmLength !== 0 && `${filmDetail.filmLength} мин.`}
          </div>
          <MovieFlags flags={flags} handleToggle={handleToggle}/>
          <MovieDetailScore filmDetail={filmDetail} filmId={filmId} dataFlag={dataFlag} isSuccessFlag={isSuccessFlag}/>
        </div>
        <MovieInfo filmDetail={filmDetail} staff={staff}/>
      </div>
      <MovieReviewPart movieReviews={movieReviews} />
    </div>
  )
}

export default MovieDetail