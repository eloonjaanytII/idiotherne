import React, { useEffect, useState} from "react"
import { useGetFilmsQuery } from "../../services/kinopoisk"
import { useDebounce } from "../../hooks/useDebounce"
import SearchInputListHeader from "./SearchInputListHeader"
import SearchInputListReview from "./SearchInputListReview"
import { FilmItem } from "../../services/types/kinopoisk"
import SkeletonInput from "./SkeletonInput"
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

  if (isLoading) return <SkeletonInput />
  
  return (
    <div className="relative ${mode === 'navbar' ? w-[30vw] : w-full}">
      <label className="flex w-full border-b-2 border-accent mb-2 p-2">
        {mode === 'navbar' &&
        <img src='/film-reel.png' className="h-[1.5em] opacity-100 mr-2"/>}
        <input
            type="text"
            className="w-full outline-none"
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