import './StoryListItem.scss';

const StoryListItem = ({ score, by, title, url, descendants }) => {
  return (
    <div className="story-list-item">
      <a className="external-link" href={url}>
        {title}
      </a>

      <div>
        <p>
          {score} {score === 1 ? 'point' : 'points'} - Posted by user:{' '}
          <span>{by}</span>
        </p>
        <p>
          {descendants} {descendants === 1 ? 'comment' : 'comments'}
        </p>
      </div>
    </div>
  );
};

export default StoryListItem;
