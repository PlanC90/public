function formatSuccess(data, message = 'Success') {
  return {
    success: true,
    message,
    data
  };
}

function formatError(error, code = 500) {
  return {
    success: false,
    error: error.message || 'Internal server error',
    code
  };
}

module.exports = {
  formatSuccess,
  formatError
};