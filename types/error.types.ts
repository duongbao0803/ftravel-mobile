export interface CustomError extends Error {
  response?: {
    data?: {
      errors: any;
      message?: string;
    };
  };
}
