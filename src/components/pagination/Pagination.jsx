const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <button
        onClick={() => setCurrentPage((prev) => prev - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      {generatedPages.map((page) => (
        <button
          onClick={() => setCurrentPage(page)}
          key={page}
          className={`w-10 h-10 flex items-center justify-center rounded-md border transition ${
            currentPage === page
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={currentPage === pages}
        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
