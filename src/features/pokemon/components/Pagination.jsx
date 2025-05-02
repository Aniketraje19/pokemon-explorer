import { usePokemonData } from "../hooks/usePokemonData";

export default function Pagination() {

  const {
      totalItems,
      itemsPerPage,
      page,
      setPage,
      setItemsPerPage
        } = usePokemonData()

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPage(page);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setPage(1); 
  };
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
      {/* Items Per Page Selector */}
      <div className="flex items-center">
        <label htmlFor="itemsPerPage" className="mr-2 font-medium">
          Items per page:
        </label>
        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          {[10, 20, 50].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => handlePageClick(page - 1)}
          disabled={page === 1}
          className="p-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageClick(page + 1)}
          disabled={page === totalPages}
          className="p-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
