const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center text-center card shadow-md animate-pulse">
      <div className="w-[200px] h-[300px] rounded-md bg-base-300 skeleton" />
    </div>
  )
}

export default MovieCardSkeleton