import './Error.scss';

const Error = ({ message }) => {
  return (
    <div className="error">
      <h1>There was a problem:</h1>
      <h2>{message}</h2>;<h1>Please try again later</h1>
    </div>
  );
};

export default Error;
