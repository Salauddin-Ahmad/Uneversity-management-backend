import dotenv from 'dotenv';

import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

// Log to check if environment variables are loaded
// console.log('Loaded PORT:', process.env.PORT);
// console.log('Loaded DATABASE_URL:', process.env.DATABASE_URL);

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds : process.env.BCRYPT_SALT_ROUNDS,
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  
};
