interface Flags {
  isWatched: boolean;
  favorite: boolean;
}

interface MovieFlagsProps {
  flags: Flags;
  flagHandler: (key: "isWatched" | "favorite") => void
}

const MovieFlags: React.FC<MovieFlagsProps>= ({flags, flagHandler}) => {

  return (
    <div className='flex gap-2 md:gap-5 justify-between'>
        <div 
        className={`hover:bg-gray-400 ${flags.isWatched ? "" : "active"} button-film cursor-pointer `}
        onClick={() => flagHandler("isWatched")} 
        >
        {flags.isWatched ? "Просмотрено" : "Просмотреть"}</div>
        <div 
        className={`hover:bg-gray-400 ${flags.favorite ? "" : "active"} button-film cursor-pointer mb-4`}
        onClick={() => flagHandler("favorite")} 
        >
        {flags.favorite ? "В избранном" : "В избранное"}</div>
    </div>
  )
}

export default MovieFlags