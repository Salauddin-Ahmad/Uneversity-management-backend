import express, { Application, Request, response, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import { error } from 'console';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.status(200).send(a.toString()); // Converts the number to a string to avoid issues
};
app.get('/', getAController);

app.use((error: any, req: Request, res: Response, next: NextFunction ) => {
  const statusCode = 500;
  const message = error.message || "Something went wrong!";
   return res.status(statusCode).json({
    success: false,
    message,
    error: error,
   }) 
})

export default app;
