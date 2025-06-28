import React, { useEffect, useState} from "react"
import { useGetFilmsQuery } from "../../services/kinopoisk"
import { useDebounce } from "../../hooks/useDebounce"
import SearchInputListHeader from "./SearchInputListHeader"
import SearchInputListReview from "./SearchInputListReview"
import { FilmItem } from "../../services/types/kinopoisk"


interface SearchInputProps {
  mode?: string;
  setKinoId: (id: number) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({mode, setKinoId}) => {

  const [isActive, setIsActive] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [results, setResults] = useState<FilmItem[]>([]);

  const debouncedKeyword = useDebounce(keyword, 300);

  const {data, isLoading} = useGetFilmsQuery({keyword: debouncedKeyword});

  useEffect(() => {
    if (data?.items?.length) {
      setResults(data.items)
    }
  }, [data?.items])

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