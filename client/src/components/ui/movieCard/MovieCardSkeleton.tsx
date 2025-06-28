const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center text-center card shadow-md animate-pulse">
      <div className="w-[200px] h-[300px] rounded-md bg-base-300 skeleton" />
      <div className="card-body">
        <div className="h-4 w-3/4 bg-base-300 skeleton rounded"></div>
      </div>
    </div>
  )
}

export default MovieCardSkeleton