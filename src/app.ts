import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  const a = 'hello'; // Replace with your logic here to fetch data from your database or API
  res.send(a);
});

export default app;
