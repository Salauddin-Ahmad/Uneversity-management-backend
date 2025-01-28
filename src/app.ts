import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes/index';
import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: ['http://localhost:5173']}));

app.use('/api/v1/', router);



// const test = (req: Request, res: Response) => {
//   Promise.reject()
// };
// app.get('/', test);

app.use(globalErrorHandler)
// app.use(notFound)

export default app;
