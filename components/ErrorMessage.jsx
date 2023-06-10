
const ErrorMessage = ({ error }) => {
  return <>{error ? <div className="alert alert-warning" role="alert">{error}</div> : null}</>;
};

export default ErrorMessage;
