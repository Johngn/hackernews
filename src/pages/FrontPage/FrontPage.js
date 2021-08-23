import { useState, useEffect } from 'react';

import StoryListItem from '../../components/StoryListItem/StoryListItem';
import SearchBox from '../../components/SearchBox/SearchBox';
import SortSelect from '../../components/SortSelect/SortSelect';
import Pagination from '../../components/Pagination/Pagination';

import './FrontPage.scss';

const FrontPage = ({ stories }) => {
  const [page, setPage] = useState(0);
  const [sortType, setSortType] = useState('id');
  const [displayStories, setDisplayStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const pageLength = 13;

  useEffect(() => {
    const sortArray = type => {
      const types = {
        score: 'score',
        descendants: 'descendants',
        id: 'id',
      };
      const sortProperty = types[type];
      const filteredStories = [...stories]
        .filter(story =>
          story.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
        )
        .sort((a, b) => b[sortProperty] - a[sortProperty]);

      setDisplayStories(filteredStories);
    };

    sortArray(sortType);
    setPage(0);
  }, [stories, sortType, searchTerm]);

  return (
    <div className="story-list">
      <div className="story-list-header">
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <SortSelect sortType={sortType} setSortType={setSortType} />
      </div>

      <div className="story-list-story-container">
        {displayStories
          .slice(page * pageLength, page * pageLength + pageLength)
          .map(story => (
            <StoryListItem
              key={story.id}
              score={story.score}
              url={story.url}
              id={story.id}
              by={story.by}
              title={story.title}
              descendants={story.descendants}
            />
          ))}
      </div>

      {displayStories.length > 0 ? (
        <Pagination
          storiesLength={displayStories.length}
          page={page}
          setPage={setPage}
          pageLength={pageLength}
        />
      ) : (
        <div className="no-stories-container">
          <h2>No stories found</h2>
        </div>
      )}
    </div>
  );
};

export default FrontPage;
