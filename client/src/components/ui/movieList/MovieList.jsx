import React from 'react'
import MovieCard from '../movieCard/MovieCard'
import Pagination from '../pagination/Pagination'
import MovieCardSkeleton from '../movieCard/MovieCardSkeleton'

const MovieList = ({items, totalPages, currentPage, setCurrentPage, isLoading}) => {


  if (isLoading || !items) return (
    <div className='min-h-[400px] flex flex-col items-center'>
      <div className="skeleton h-12 w-[50vw]"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
        {Array.from({length: 15}).map((_, idx) => (
          <MovieCardSkeleton key = {idx}/>
        ))}
      </div>
      <div className="skeleton h-12 w-[50vw]"></div>
    </div>
  )

  return (
    <div className='min-h-[400px] m-auto flex flex-col w-[90vw]'>
      <div className='flex flex-row justify-evenly items-center'>
        <div className="flex justify-center">
          <Pagination {...{totalPages, currentPage, setCurrentPage}} />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 ">
        {!isLoading && items.length > 0 && items.map(item => (
          <MovieCard item = {item} key={item.kinopoiskId}/>
        ))}
      </div>
    </div>
  )
}

export default MovieList