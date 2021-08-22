import './PaginationButtons.scss';

const PaginationButtons = ({ stories, page, setPage, pageLength }) => {
  return (
    <div className="pagination-button-container">
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>
        Prev
      </button>

      <div style={{ textAlign: 'center' }}>
        <p>
          {page * pageLength + 1}-
          {page * pageLength + pageLength > stories.length
            ? stories.length
            : page * pageLength + pageLength}{' '}
          of {stories.length}
        </p>
      </div>

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
