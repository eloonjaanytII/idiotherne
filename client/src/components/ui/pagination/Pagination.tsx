
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC <PaginationProps> = ({ totalPages, currentPage, setCurrentPage }) => {

  const windowPage = 5;
  const start = Math.floor((currentPage - 1) / windowPage) * windowPage + 1;
  const end = Math.min(start + windowPage - 1, totalPages);

  const pagesToShow = [];

  for (let i = start; i <= end; i++) {
    pagesToShow.push(i);
  }

  const nextBatchPage = () => {
    if (end < totalPages) {
      setCurrentPage(end + 1);
    }
  };

  const backBatchPage = () => {
    if (start > 1) {
      setCurrentPage(start - windowPage);
    }
  };

  return (
    <div className="join my-4">
      {start > 1 && (
        <button className="join-item btn btn-dash btn-secondary" onClick={backBatchPage}>
          «
        </button>
      )}
      {pagesToShow.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`join-item btn btn-dash btn-secondary ${page === currentPage ? 'btn-active' : ''}`}
        >
          {page}
        </button>
      ))}
      {end < totalPages && (
        <button className="join-item btn btn-dash btn-secondary" onClick={nextBatchPage}>
          »
        </button>
      )}
    </div>
  );
};

export default Pagination;