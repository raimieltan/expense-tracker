// components/Pagination.tsx
interface PaginationProps {
    currentPage: number;
    totalResults: number;
    resultsPerPage: number;
    onPageChange: (page: number) => void;
  }
  
  const Pagination = ({
    currentPage,
    totalResults,
    resultsPerPage,
    onPageChange,
  }: PaginationProps) => {
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const startIndex = (currentPage - 1) * resultsPerPage + 1;
    const endIndex = Math.min(currentPage * resultsPerPage, totalResults);
  
    return (
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-700">
          {startIndex}-{endIndex} of {totalResults} results
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 border rounded ${currentPage === 1 ? 'text-gray-300' : 'text-gray-700'}`}
          >
            ←
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 border rounded ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-700'}`}
          >
            →
          </button>
        </div>
      </div>
    );
  };
  
  export default Pagination;
  