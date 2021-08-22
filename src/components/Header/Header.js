import SearchBox from '../SearchBox/SearchBox';
import SortSelect from '../SortSelect/SortSelect';

import './Header.scss';

const Header = ({ searchTerm, setSearchTerm, sortType, setSortType }) => {
  return (
    <div className="story-list-header">
      <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SortSelect sortType={sortType} setSortType={setSortType} />
    </div>
  );
};

export default Header;
