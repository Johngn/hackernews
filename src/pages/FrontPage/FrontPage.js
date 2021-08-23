import { useState, useEffect } from 'react';
import { getAllStoryIDs, getAllStoryDetails } from '../../utils/httpRequests';

import StoryListItem from '../../components/StoryListItem/StoryListItem';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

import './FrontPage.scss';
import Header from '../../components/Header/Header';
import Pagination from '../../components/Pagination/Pagination';
import Error from '../../components/Error/Error';

const FrontPage = () => {
  const [page, setPage] = useState(0);
  const [sortType, setSortType] = useState('id');
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [storyIds, setStoryIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const pageLength = 12;

  useEffect(() => {
    setIsLoading(true);
    getAllStoryIDs(12).then(res => {
      const [data, errorMessage] = res;

      setStoryIds(data);
      setError(errorMessage);
    });
  }, []);

  useEffect(() => {
    if (storyIds.length > 0 && !error) {
      getAllStoryDetails(storyIds).then(res => {
        const [data, errorMessage] = res;

        setError(errorMessage);
        setStories(data); // reserve data for filtering
        setFilteredStories(data);
        setIsLoading(false);
      });
    }
    if (error) {
      setIsLoading(false);
    }
  }, [error, storyIds]);

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
  }, [sortType, error]);

  useEffect(() => {
    const filteredStories = stories.filter(story =>
      story.title.toLowerCase().includes(searchTerm)
    );

    setFilteredStories(filteredStories);
    setPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const StoryList = (
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
        <Pagination
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

  return isLoading ? (
    <LoadingSpinner />
  ) : error ? (
    <Error message={error} />
  ) : (
    StoryList
  );
};

export default FrontPage;
