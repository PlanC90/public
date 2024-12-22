export class ServiceError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

export function handleServiceError(error) {
  console.error('Service error:', error);
  if (error instanceof ServiceError) {
    return { success: false, error: error.message, code: error.code };
  }
  return { success: false, error: 'Internal server error', code: 500 };
}