import './SortSelect.scss';

const SortSelect = props => {
  const { sortType, setSortType } = props;

  return (
    <div className="sort-select">
      <label htmlFor="sort-by">Sort by:</label>
      <select
        name="sort-by"
        onChange={e => setSortType(e.target.value)}
        value={sortType}
      >
        <option value="id">New</option>
        <option value="score">Score</option>
        <option value="descendants">Comments</option>
      </select>
    </div>
  );
};

export default SortSelect;
