import './Pagination.scss';

const Pagination = ({ storiesLength, page, setPage, pageLength }) => {
  const lowValue = page * pageLength + 1;
  const highValue =
    page * pageLength + pageLength > storiesLength
      ? storiesLength
      : page * pageLength + pageLength;

  const disablePrev = page === 0;
  const disableNext = page >= storiesLength / pageLength - 1;

  return (
    <div className="pagination-button-container">
      <button disabled={disablePrev} onClick={() => setPage(page - 1)}>
        Prev
      </button>

      <div>
        <p>
          {lowValue}-{highValue} of {storiesLength}
        </p>
      </div>

      <button disabled={disableNext} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
