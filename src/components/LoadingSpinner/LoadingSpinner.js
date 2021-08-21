import RingLoader from 'react-spinners/RingLoader';

import './LoadingSpinner.scss';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <RingLoader color={'#fff'} loading={true} size={100} />
    </div>
  );
};

export default LoadingSpinner;
