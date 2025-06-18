const ReviewList = ({data, isOwner}) => {

  return (
    <div>
        {data.reviews.length !== 0 &&
        <ul className="text-center flex flex-col gap-2">
            {data.reviews.map((item, idx) => (
                <li key={item.id} className='border-2 border-accent rounded-xl p-3'>
                    <p>Рецензия № {idx+1}</p>
                    <p className="mb-3">"{item.title}"</p>
                    <p className="text-justify">{item.content}</p>
                </li>
            ))}
        </ul>
        }
        {data.reviews.length === 0 && !isOwner &&
            <div>
                <p>У пользователя нет еще рецензий</p>
            </div>
        }
        {data.reviews.length === 0 && isOwner &&
            <div>
                <p>Самое время написать рецензию!</p>
            </div>
        }

    </div>
  )
}

export default ReviewList