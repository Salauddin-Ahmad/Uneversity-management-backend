import { NextFunction, Request, Response } from 'express';

// const { status } = require("http-status");
// // Or
// const { default: status } = require("http-status");

const notFound = async (req: Request, res: Response, next: NextFunction) => {
  const { default: StatusCodes } = await import('http-status');
  res.status(StatusCodes).json({
    success: false,
    message: 'Api not found',
    error: '',
  });
};

export default notFound;
