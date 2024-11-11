import useTodoStore from "../../store/todoStore";
import "./Pagination.scss";

export const Pagination = () => {
  const { currentPage, setPage, totalPages } = useTodoStore();

  return (
    <>
      <span className="hideTotalPagesInfo">
        Page {currentPage} of {totalPages}
      </span>
      <div className="pagination-container">
        <button
          onClick={() => setPage(1)}
          disabled={currentPage === 1}
          aria-label="First Page"
        >
          <span className="material-icons">first_page</span>
        </button>
        <button
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          <span className="material-icons">chevron_left</span>
        </button>
        <span className="showTotalPagesInfo">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          <span className="material-icons">chevron_right</span>
        </button>

        <button
          onClick={() => setPage(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last Page"
        >
          <span className="material-icons">last_page</span>
        </button>
      </div>
    </>
  );
};
