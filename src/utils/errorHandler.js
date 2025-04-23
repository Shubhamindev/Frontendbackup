export class AppError extends Error {
  constructor(message, status = 500, details = '', errorCode = '') {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.details = details;
    this.errorCode = errorCode;
  }
}

export class NetworkError extends AppError {
  constructor(message = 'Network error occurred', status = 503) {
    super(message, status, 'Unable to connect to the server', 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

export const handleApiError = (error) => {
  if (error.response && error.response.data) {
    return error.response.data;
  }
    return {
    message: error.message || 'Network error - please check your connection',
    status: error.status || 0
  };
};


export const getErrorMessage = (error) => {
  return error.response?.data?.message || error.message || 'An error occurred';
};