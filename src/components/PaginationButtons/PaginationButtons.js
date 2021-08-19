import './PaginationButtons.scss';

const PaginationButtons = ({ stories, page, setPage, pageLength }) => {
  return (
    <div className="pagination-button-container">
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>
        Previous
      </button>

      <button
        disabled={page >= stories.length / pageLength - 1}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
