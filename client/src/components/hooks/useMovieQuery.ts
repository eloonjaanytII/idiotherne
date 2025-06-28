import { useGetFilmsCollectionsQuery, useGetFilmsQuery } from '../services/kinopoisk'
import { TOP_LISTS, TOP_LISTS_TYPE } from '../../constants'
import { useAppSelector } from '../store/hooks'


const useMovieQuery = () => {

    const {countries, order, page, yearFrom, yearTo} = useAppSelector(state => state.currentMovie || {})

    const popularFilm = TOP_LISTS.find(film => film.value === 'TOP_POPULAR_MOVIES') as TOP_LISTS_TYPE;
    const bestFilm = TOP_LISTS.find(film => film.value === 'TOP_POPULAR_MOVIES') as TOP_LISTS_TYPE;

    if (!popularFilm || !bestFilm) throw new Error("Popular film type not found in TOP_LISTS");

    const responsePopular = useGetFilmsCollectionsQuery({type: popularFilm.value , page})
    const responseBest = useGetFilmsCollectionsQuery({type: bestFilm.value, page })

    const responseFilms = useGetFilmsQuery({countries, genres: 1, order, yearFrom, yearTo, type : 'FILM', page, keyword: '' });

    const responseSerial = useGetFilmsQuery({countries, genres: 1, order, yearFrom, yearTo, type: 'TV_SERIES', page, keyword: ''});

    const responseCartoons = useGetFilmsQuery({countries, genres: 18, order, yearFrom, yearTo, type: 'FILM', page, keyword: '' });

    const isLoading = responsePopular.isFetching || responseBest.isFetching || 
                      responseFilms.isFetching || responseSerial.isFetching || 
                      responseCartoons.isFetching

    const hasError = responsePopular.error || responseBest.error || 
    responseFilms.error || responseSerial.error || 
    responseCartoons.error

  return {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseSerial,
    responseCartoons
  }
}

export default useMovieQuery