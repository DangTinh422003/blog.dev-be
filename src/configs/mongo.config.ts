import dotenv from 'dotenv';
dotenv.config({ path: ['.env.local', '.env'] });

interface Config {
  app: {
    port: number;
    host: string;
  };
  db: {
    dbUserName: string;
    dbPassword: string;
    dbName: string;
  };
}

const dev: Config = {
  app: {
    port: Number(process.env.DEV_APP_PORT) || 3000,
    host: process.env.DEV_APP_HOST ?? 'localhost',
  },
  db: {
    dbUserName: process.env.MONGO_DB_USER_NAME!,
    dbPassword: process.env.MONGO_DB_PASSWORD!,
    dbName: process.env.MONGO_DB_NAME!,
  },
};

const prod = {
  app: {
    port: process.env.PROD_APP_PORT || 3000,
    host: process.env.PROD_APP_HOST || 'localhost',
  },
  db: {
    dbUserName: process.env.MONGO_DB_USER_NAME,
    dbPassword: process.env.MONGO_DB_PASSWORD,
    dbName: process.env.MONGO_DB_NAME,
  },
};

type Env = 'dev' | 'prod';

const configs: Record<Env, Config | typeof prod> = {
  dev,
  prod,
};

const env: Env = (process.env.NODE_ENV as Env) ?? 'dev';
export default configs[env];
