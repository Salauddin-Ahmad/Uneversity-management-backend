import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes/index';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/', router);



const test = (req: Request, res: Response) => {
  Promise.reject()
};
app.get('/', test);

app.use(globalErrorHandler)
// app.use(notFound)

export default app;
