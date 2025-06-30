
interface MoviePersonCardProps {
    posterUrl: string | null;
    nameRu: string | null; 
}

const MoviePersonCard: React.FC<MoviePersonCardProps> = ({posterUrl, nameRu}) => {
  return (
    <div className='flex border-2 rounded-md justify-between items-center hover:bg-base-300 h-18 hover:scale-102 transition-transform duration-200 p-1 mb-2 gap-2'>
        <div className='h-full min-w-10'>
            <img 
        src={typeof posterUrl === 'string' && posterUrl ? posterUrl : '/fallback.png'}
        alt={nameRu || 'Персона'}
        className='h-full w-full object-cover rounded-lg'/>
        </div>
        <p className='text-sm md:text-lg flex-1 text-center pr-2'>{nameRu}</p>
    </div>
  )
}

export default MoviePersonCard