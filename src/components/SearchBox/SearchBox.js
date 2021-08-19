import './SearchBox.scss';

const SearchBox = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-box">
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
