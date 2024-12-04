import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      console.log(`i am a shena bahini`);
  
      try {
        // data validation using zod
        // await schema.parseAsync({
        //   body: req.body,
        // });

        await schema.parseAsync(req.body);
        next();

      } catch (error) {
        // goto next controller
        next(error);
      }
    };
  };

  export default validateRequest;