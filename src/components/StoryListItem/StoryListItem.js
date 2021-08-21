import { Link } from 'react-router-dom';

import './StoryListItem.scss';

const StoryListItem = ({ score, by, id, title, url, descendants }) => {
  return (
    <div className="story-list-item">
      <p>
        <a className="external-link" href={url}>
          {title}
        </a>
      </p>

      <div className="footer">
        <p>
          {score} {score === 1 ? 'point' : 'points'} - Posted by user:{' '}
          <span>{by}</span>
        </p>
        <p className="comments">
          <Link to={`/story/${id}`}>
            {descendants} {descendants === 1 ? 'comment' : 'comments'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default StoryListItem;
