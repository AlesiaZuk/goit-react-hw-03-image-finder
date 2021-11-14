import Loader from 'react-loader-spinner';

function LoaderSpinner() {
  return (
    <Loader
      type="Circles"
      color="#b89393"
      height={100}
      width={100}
      timeout={3000}
    />
  );
}
export default LoaderSpinner;
