import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

const getAController = (req: Request, res: Response) => {
  const a = 'hello'; // Replace with your logic here to fetch data from your database or API
  res.send(a);
}

app.use('/api/v1/students', StudentRoutes)


app.get('/', getAController);

export default app;
