const createStudent: RequestHandler = async (req, res, next) => {
    try {
      const { student: studentData } = req.body;
  
      // data validation using zod
      const zodParsedData = studentValidationSchema.parse(studentData);
      // const {error, value} = studentValidationSchema.validate(studentData);
  
      const result = await StudentServices.createStudentIntoDB(zodParsedData);
  
      res.status(201).json({
        success: true,
        message: 'Student created successfully',
        data: result,
      });
    } catch (error : any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: error,
      });
      next(error); // Pass to error handler
    }
  };