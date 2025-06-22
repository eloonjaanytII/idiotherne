
import { Link } from 'react-router-dom'

const MovieReviewPart = ({movieReviews}) => {

  console.log(movieReviews)

  return (
    <div className='flex flex-col justify-center items-center w-full'>
        <h2 className='text-center font-semibold text-2xl mb-3 mt-3'>Рецензии:</h2>
        <div className='border-2 border-accent rounded-xl p-2 w-[90%] flex flex-col gap-3'>
            {movieReviews.length === 0 
          ? <div>У фильма ещё нет рецензий. <br/> Вы можете написать её в своём профиле!</div>
          : movieReviews.map(r => (
            <div key={r.kinopoiskId} className='flex gap-3 justify-between text-center p-4'>
              <div className='flex flex-col justify-start gap-4'>
                <p className='text-2xl'>{r.title}</p>
                <p>{r.content}</p>
              </div>
              <div>
                <p className='text-2xl'>{r.username}</p>
                <Link to={`/user/${r.userId}`}>
                  <img alt="pickha" src={`/animals/${r.avatar}.png`}/>
                </Link>  
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default MovieReviewPart