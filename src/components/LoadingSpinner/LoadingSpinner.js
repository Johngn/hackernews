import RingLoader from 'react-spinners/RingLoader';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <RingLoader color={'#000'} loading={true} size={100} />
    </div>
  );
};

export default LoadingSpinner;
