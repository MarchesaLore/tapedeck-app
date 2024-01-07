import React from 'react';

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => {
  return message ? <div className="error-message">{message}</div> : null;
};

export default ErrorDisplay;
