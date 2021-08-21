const Comment = ({ text, by }) => {
  return (
    <div style={{ marginTop: '10px' }}>
      <p>{text}</p>
      <p>Author: {by}</p>
    </div>
  );
};

export default Comment;
