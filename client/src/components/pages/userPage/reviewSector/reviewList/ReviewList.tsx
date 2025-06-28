import { ReviewBody } from "../../../../services/types/review";

interface ReviewListProps {
    isOwner: boolean;
    data: ReviewBody[] | undefined;
}


const ReviewList: React.FC <ReviewListProps> = ({data, isOwner}) => {

  return (
    <div>
        {data &&
        <ul className="text-center flex flex-col gap-2">
            {data.map((item, idx) => (
                <li key={item.kinopoiskId} className='border-2 border-accent rounded-xl p-3 min-h-[300px]'>
                    <p>Рецензия № {idx+1}</p>
                    <p className="mb-3">"{item.title}"</p>
                    <p className="text-justify p-2 w-full break-words">{item.content}</p>
                </li>
            ))}
        </ul>
        }
        {!data && !isOwner &&
            <div>
                <p>У пользователя нет еще рецензий</p>
            </div>
        }
        {!data && isOwner &&
            <div>
                <p>Самое время написать рецензию!</p>
            </div>
        }

    </div>
  )
}

export default ReviewList