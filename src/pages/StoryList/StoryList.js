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
  const [storyIds, setStoryIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [pageLength, setPageLength] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getAllStoryIDs().then(data => {
      setStoryIds(data);
    });
  }, []);

  useEffect(() => {
    if (storyIds.length > 0) {
      getAllItemDetails(storyIds).then(data => {
        setStories(data);
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
    };

    sortArray(sortType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  useEffect(() => {
    const filteredStories = stories.filter(story =>
      story.title.toLowerCase().includes(searchTerm)
    );

    setStories(filteredStories);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const pageLength = 10;

  return (
    <div className="story-list">
      <h1>Hacker News top stories</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Header
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortType={sortType}
            setSortType={setSortType}
          />

          <div className="story-list-story-container">
            {stories
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

          <PaginationButtons
            stories={stories}
            page={page}
            setPage={setPage}
            pageLength={pageLength}
          />
        </>
      )}
    </div>
  );
};

export default StoryList;
