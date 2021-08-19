import { Link } from 'react-router-dom';

import './StoryListItem.scss';

const StoryListItem = ({ by, id, title }) => {
  return (
    <div className="story-list-item">
      <Link to={`/story/${id}`}>{title}</Link>
      <p>{by}</p>
    </div>
  );
};

export default StoryListItem;
