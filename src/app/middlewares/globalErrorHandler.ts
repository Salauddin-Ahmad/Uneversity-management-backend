import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // setting default values
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong!';

  if(error instanceof ZodError){
    statusCode = 400
    message = 'ami zod error'
  }
  
  
  
  
  
  
  
  
  
  
  
  type TerrorSource = {
    path: string | number;
    message: string;
  }[];

  let errorSources: TerrorSource = [{
    path: '',
    message: '',
  }];

  

  res.status(statusCode).json({
    success: false,
    message,
    errorSources
  });
  next(error);
};

export default globalErrorHandler;
