import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import TerrorSources from '../interface/errorInterface';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  
  let errorSources: TerrorSources = [
    {
      path: '',
      message: '',
    },
  ];

  // setting default values
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong!';



  if (error instanceof ZodError) {
    const simplifiedZodError = handleZodError(error);
    statusCode = simplifiedZodError.statusCode;
    message = simplifiedZodError.message;
  } else if (error?.name === 'validationError'){

    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
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
