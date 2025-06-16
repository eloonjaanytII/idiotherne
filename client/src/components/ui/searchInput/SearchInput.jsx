import { useEffect, useState} from "react"
import { useGetFilmsQuery } from "../../services/kinopoisk"
import { useDebounce } from "../../hooks/useDebounce"
import SearchInputListHeader from "./SearchInputListHeader"
import SearchInputListReview from "./SearchInputListReview"

const SearchInput = ({mode, setKinoId}) => {

  const [isActive, setIsActive] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);

  const debouncedKeyword = useDebounce(keyword, 300);

  const {data, isLoading} = useGetFilmsQuery({keyword: debouncedKeyword});

  useEffect(() => {
    if (data?.items) {
      setResults(data.items)
    }
  }, [data])

  if (isLoading) return <div>isLoading...</div>
  
  return (
    <div className="relative ${mode === 'navbar' ? w-[30vw] : w-full}">
      <label className="input grow w-full bg-gray-200 text-black">
        {mode === 'navbar' &&
        <img src='/film-reel.png' className="h-[1.5em] opacity-100"/>}
        <input
            type="text"
            className=""
            placeholder="Поиск фильма..."
            maxLength = {40}
            value={keyword}
            onFocus={() => setIsActive(true)}
            onBlur = {() => setTimeout(() => setIsActive(false), 100)}
            onChange={(e) => setKeyword(e.target.value)}
      />
      </label>
      
      {isActive && results.length > 0 && mode === 'navbar' &&
        <SearchInputListHeader {...{results, setKeyword, setResults}} />
      }
      {isActive && results.length > 0 && mode === 'review' &&
        <SearchInputListReview {...{results, setKeyword, setResults, setKinoId}}/>
      }
    </div>
  )
}

export default SearchInput