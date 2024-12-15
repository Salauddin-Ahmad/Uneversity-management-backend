// import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import { TErrorSources } from '../interface/errorInterface';
import handleDuplicateError from '../errors/handleDuplicateError';

const globalErrorHandler = (
  error,
  req,
  res,
  next,
) => {

  let errorSources: TErrorSources = [
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
  } 
  
  else if (error?.name === 'validationError'){

    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } 
  
  else if (error?.name === 'CastError'){
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }
  else if (error?.code === 1100){
    const simplifiedError = handleDuplicateError(error);
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
