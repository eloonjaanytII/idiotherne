import {useCallback, useEffect, useState} from 'react'
import { useGetFilmsCollectionsQuery, useGetFilmsQuery, useGetGenresAndCountriesQuery } from '../../services/kinopoisk'
import {useLocation, Location, Navigate } from 'react-router-dom'
import { TOP_LISTS } from '../../../constants'
import MovieList from '../../ui/movieList/MovieList'
import ErrorMessage from '../../ui/errorMessage/ErrorMessage'
import SelectMovie from '../../ui/selectMovie/SelectMovie'
import { resetFilters, setCountry, setGenre, setOrder, setYear } from '../../store/features/currentMovieSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

const MovieListTop = () => {

  const [currentPage, setCurrentPage] = useState<number>(1);

  const {countries, genres, order, yearFrom, yearTo} = useAppSelector(state => state.currentMovie)
  
  const dispatch = useAppDispatch();
  const location: Location = useLocation();

  const movieType = TOP_LISTS.find(elem => `${elem.url}` === location.pathname.split('/')[1]);

  if (!movieType) return <Navigate to="/404" />;

  const isCollections = movieType.useCollections;

  const queryCollections = useGetFilmsCollectionsQuery(
    {type: movieType.value, page: currentPage},
    {skip: !isCollections}
  )

  const queryFilms = useGetFilmsQuery(
    {
      countries,
      genres: movieType.url === 'cartoons' ? 18 : genres, 
      order,
      type : movieType.value,
      yearFrom,
      yearTo,
      page: currentPage,
      keyword : '',
    },
    {skip: isCollections}
  )

  const {data: listGenresAndCountries, error: listGenresAndCountriesError  } = useGetGenresAndCountriesQuery()
  
  useEffect(() => {

    setCurrentPage(1);

    return () => {
      dispatch(resetFilters())
    }
  }, [dispatch, movieType])


  useEffect(() => {
    setCurrentPage(1);

  }, [dispatch, countries, genres, order, yearFrom, yearTo]);

  const query = isCollections ? queryCollections : queryFilms;

  if (query.error || listGenresAndCountriesError) return <ErrorMessage />


  const onChangeCountry = useCallback((value: number) => dispatch(setCountry(value)), [dispatch]);
  const onChangeYear = useCallback(({yearFrom, yearTo}: {yearFrom: number, yearTo: number}) => dispatch(setYear({yearFrom, yearTo})), [dispatch]);
  const onChangeOrder = useCallback((value: string) => dispatch(setOrder(value)), [dispatch]);
  const onChangeGenre = useCallback((value: number) => dispatch(setGenre(value)), [dispatch]);
  const onReset = useCallback(() => dispatch(resetFilters()), [dispatch]);



  return (
    <div>
      {!isCollections &&
        <SelectMovie  countriesList = {listGenresAndCountries?.countries || []}
                      genresList = {listGenresAndCountries?.genres || []}
                      {...{countries, genres, order, yearFrom, yearTo, 
                           onChangeCountry, onChangeYear, onChangeOrder, onChangeGenre, onReset}}/>
      }
      <MovieList items={query.data?.items ||[]} 
                 totalPages = {query.data?.totalPages || 1}
                 {...{currentPage, setCurrentPage}}
                 isLoading = {query.isLoading}
               />
    </div>
  )

}

export default MovieListTop