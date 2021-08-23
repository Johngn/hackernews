import './Error.scss';

const Error = ({ message }) => {
  const displayedMessage =
    message || 'An unexpected error occured. Try again later';

  return (
    <div className="error">
      <h1>There was a problem:</h1>
      <h2>{displayedMessage}</h2>;<h1>Please try again later</h1>
    </div>
  );
};

export default Error;
