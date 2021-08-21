import { useState, useEffect } from 'react';
import {
  getSingleItemDetails,
  getAllItemDetails,
} from '../../utils/httpRequests';

import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Comment from '../../components/Comment/Comment';

import './SingleStory.scss';

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
    <div className="single-story">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        storyDetails && (
          <div>
            <h1>{storyDetails?.text}</h1>
            <h1>Author: {storyDetails?.by}</h1>
            <div>
              {comments &&
                comments.map(comment => (
                  <Comment key={comment.id} text={comment.text} />
                ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SingleStory;
