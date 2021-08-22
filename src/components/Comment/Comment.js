import './Comment.scss';

const Comment = ({ text, by }) => {
  return (
    <div className="comment">
      <p>{text}</p>
      <p>Author: {by}</p>
    </div>
  );
};

export default Comment;
