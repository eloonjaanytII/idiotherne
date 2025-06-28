import { FormEvent } from 'react';
import SearchInput from '../../../../ui/searchInput/SearchInput'


interface ReviewFormProps {
    content: string;
    title: string;
    handlerSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    setContent: (e: string) => void;
    setTitle: (e: string) => void;
    setKinoId: (e: number) => void;
}


const ReviewForm: React.FC <ReviewFormProps> = ({content, title, setContent, setTitle, setKinoId, handlerSubmit }) => {
  return (
    <form onSubmit={handlerSubmit} className='mb-4'>
            <div className='flex gap-8 mb-2'>
                <SearchInput mode='review' setKinoId={setKinoId}/>
                <button className='btn btn-primary text-orange-200' type='submit'>
                Отправить   
            </button>
            </div>
            <input 
                placeholder='Название рецензии'
                value={title}
                className="input input-neutral border-2 mt-1 mb-2 w-full"
                onChange={e => setTitle(e.target.value)}
            />
            <textarea 
                placeholder="Место для раздумий" 
                value = {content}
                onChange={e => setContent(e.target.value)}
                className="textarea textarea-neutral border-2 w-full mb-2 max-h-50"
                
            />
        </form>
  )
}

export default ReviewForm