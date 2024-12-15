import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import TerrorSource from '../interface/errorInterface';
import config from '../config';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorSources: TerrorSource = [
    {
      path: '',
      message: '',
    },
  ];

  // setting default values
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong!';

  const handleZodError = (err: ZodError) => {
    const errorSources: TerrorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });
    statusCode = 400;
    return {
      statusCode,
      message: 'Validation Error',
      errorSources,
    };
  };

  if (error instanceof ZodError) {
    const simplifiedZodError = handleZodError(error);
    statusCode = simplifiedZodError.statusCode;
    message = simplifiedZodError.message;
  }

  // ultimately returns this
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
  next(error);
};

export default globalErrorHandler;
