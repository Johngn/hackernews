import { useState, useEffect } from 'react';
import { getAllStoryIDs, getAllItemDetails } from '../../utils/httpRequests';

import StoryListItem from '../../components/StoryListItem/StoryListItem';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

import './StoryList.scss';
import Header from '../../components/Header/Header';
import PaginationButtons from '../../components/PaginationButtons/PaginationButtons';

const StoryList = () => {
  const [page, setPage] = useState(0);
  const [sortType, setSortType] = useState('id');
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [storyIds, setStoryIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const pageLength = 12;

  useEffect(() => {
    setIsLoading(true);
    getAllStoryIDs(30).then(data => {
      setStoryIds(data);
    });
  }, []);

  useEffect(() => {
    if (storyIds.length > 0) {
      getAllItemDetails(storyIds).then(data => {
        setStories(data);
        setFilteredStories(data);
        setIsLoading(false);
      });
    }
  }, [storyIds]);

  useEffect(() => {
    const sortArray = type => {
      const types = {
        score: 'score',
        descendants: 'descendants',
        id: 'id',
      };
      const sortProperty = types[type];
      const sorted = [...stories].sort(
        (a, b) => b[sortProperty] - a[sortProperty]
      );
      setStories(sorted);
      setFilteredStories(sorted);
      setSearchTerm('');
    };

    sortArray(sortType);
    setPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  useEffect(() => {
    const filteredStories = stories.filter(story =>
      story.title.toLowerCase().includes(searchTerm)
    );

    setFilteredStories(filteredStories);
    setPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="story-list">
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortType={sortType}
        setSortType={setSortType}
      />

      <div className="story-list-story-container">
        {filteredStories
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

      {filteredStories.length > 0 ? (
        <PaginationButtons
          stories={filteredStories}
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

export default StoryList;
