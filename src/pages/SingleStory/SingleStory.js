import { useState, useEffect } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import {
  getSingleItemDetails,
  getAllItemDetails,
} from '../../utils/httpRequests';

const SingleStory = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [storyDetails, setSingleStoryDetails] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const storyID = props.match.params.id;
    getSingleItemDetails(parseFloat(storyID)).then(data => {
      setSingleStoryDetails(data);

      if (data.kids) {
        getAllItemDetails(data.kids).then(res => {
          setComments(res);
        });
      }
      setIsLoading(false);
    });
  }, [props.match.params.id]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        storyDetails && (
          <div>
            <h1>
              {storyDetails.by}
              {storyDetails?.text}
              {storyDetails?.by} test
            </h1>
            <div>
              {comments &&
                comments.map(comment => (
                  <div key={comment.id} style={{ marginTop: '10px' }}>
                    <p>{comment.text}</p>
                  </div>
                ))}
            </div>
          </div>
        )
      )}
    </>
  );
};

export default SingleStory;
