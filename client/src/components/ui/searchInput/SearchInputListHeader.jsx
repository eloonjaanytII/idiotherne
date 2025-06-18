import { Link } from "react-router-dom"

const SearchInputListHeader = ({results, setKeyword, setResults}) => {
  return (
    <ul className = "absolute z-50 mt-1 w-full max-h-60 bg-base-100 shadow rounded-box overflow-y-auto border-2 border-accent no-scrollbar">
          { results.map(item => (
            <li key = {item.kinopoiskId}>
              <Link
                to={`/movies/${item.kinopoiskId}`}
                onClick={() => {
                  setKeyword('');
                  setResults([]);
                }}
                className="block px-4 py-2 hover:bg-base-200"
              >
                <div className="flex justify-between items-center">
                  {item.nameRu ? `${item.nameRu}, ${item.year}` : 'Совпадений не найдено'}
                  <img alt="empty" src = {item.posterUrlPreview} className="w-8 h-8 rounded-full border border-accent hidden md:block"/>
                </div>
              </Link>
            </li>)
          )}
        </ul>
  )
}

export default SearchInputListHeader