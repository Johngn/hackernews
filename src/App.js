import { useState, useEffect } from 'react';
import { getAllStoryIDs, getAllStoryDetails } from './utils/httpRequests';

import Navbar from './components/Navbar/Navbar';
import FrontPage from './pages/FrontPage/FrontPage';
import Error from './components/Error/Error';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

import { numberOfStoriesRequested } from './config';

const App = () => {
  const [storyIds, setStoryIds] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getAllStoryIDs(numberOfStoriesRequested).then(res => {
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
        setStories(data);
        setIsLoading(false);
      });
    }
    if (error) {
      setIsLoading(false);
    }
  }, [storyIds, error]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <Error message={error} />
      ) : (
        <>
          <Navbar />
          <FrontPage stories={stories} />
        </>
      )}
    </>
  );
};

export default App;
