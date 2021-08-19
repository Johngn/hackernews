import SearchBox from '../SearchBox/SearchBox';
import SortSelect from '../SortSelect/SortSelect';

import './Header.scss';

const Header = ({ searchTerm, setSearchTerm, sortType, setSortType }) => {
  return (
    <div className="story-list-header">
      <SortSelect sortType={sortType} setSortType={setSortType} />
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
};

export default Header;
