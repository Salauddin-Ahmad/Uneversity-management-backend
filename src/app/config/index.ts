import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });

interface Config {
  port: string | number;
  database_url: string;
}

const config: Config = {
  port: process.env.PORT || 3000,
  database_url: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/test',
};

export default config;
