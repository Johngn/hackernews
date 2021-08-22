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
    // <div >
    isLoading ? (
      <LoadingSpinner />
    ) : (
      storyDetails && (
        <div className="single-story">
          <h1>{storyDetails?.title}</h1>
          <h4>Author: {storyDetails?.by}</h4>
          <div>
            {comments &&
              comments.map(comment => (
                <Comment key={comment.id} text={comment.text} by={comment.by} />
              ))}
          </div>
        </div>
      )
    )
    // </div>
  );
};

export default SingleStory;
