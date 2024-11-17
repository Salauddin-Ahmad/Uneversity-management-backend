import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

// Sample route
app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.json({ value: a }); // Returning the response as JSON
});


app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;
