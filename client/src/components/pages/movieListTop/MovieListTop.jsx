import React, {useEffect, useState} from 'react'
import { useGetFilmsCollectionsQuery, useGetFilmsQuery, useGetGenresAndCountriesQuery } from '../../services/kinopoisk'
import {useLocation } from 'react-router-dom'
import { TOP_LISTS } from '../../../constants'
import MovieList from '../../ui/movieList/MovieList'
import ErrorMessage from '../../ui/errorMessage/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { changeTitle } from '../../features/navbarTitleSlice'
import SelectMovie from '../../ui/selectMovie/SelectMovie'
import { resetFilters, setCountry, setGenre, setOrder, setYear } from '../../features/currentMovieSlice'

const MovieListTop = () => {

  const [currentPage, setCurrentPage] = useState(1);

  const {countries, genres, order, yearFrom, yearTo} = useSelector( state => state.currentMovie)
  

  const dispatch = useDispatch();
  const location = useLocation();

  const movieType = TOP_LISTS.find(elem => `${elem.url}` === location.pathname.split('/')[1]);

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

  const listGenresAndCountries = useGetGenresAndCountriesQuery()
  
  useEffect(() => {

    setCurrentPage(1);
    dispatch(changeTitle(movieType.title || ''))

    return () => {
      dispatch(changeTitle(''))
      dispatch(resetFilters())
    }
  }, [dispatch, movieType])


  useEffect(() => {
    setCurrentPage(1);

  }, [dispatch, countries, genres, order, yearFrom, yearTo]);

  const query = isCollections ? queryCollections : queryFilms;

  if (query.error || listGenresAndCountries.error) return <ErrorMessage />

  return (
    <div>
      {!isCollections &&
        <SelectMovie countriesList = {listGenresAndCountries.data?.countries || []}
        genresList = {listGenresAndCountries.data?.genres || []}
        {...{countries, genres, order, yearFrom, yearTo}}
        onChangeCountry = {value => dispatch(setCountry(value))}
        onChangeYear = {({yearFrom, yearTo}) => dispatch(setYear({yearFrom, yearTo}))}
        onChangeOrder = {value => dispatch(setOrder(value))}
        onChangeGenre = {value => dispatch(setGenre(value))}
        onReset = {() => dispatch(resetFilters())}
        />
      }
      <MovieList items={query.data?.items ||[]} 
               totalPages = {query.data?.totalPages ||1}
               {...{currentPage, setCurrentPage}}
               isLoading = {query.isLoading }
               />
    </div>
  )

}

export default MovieListTop