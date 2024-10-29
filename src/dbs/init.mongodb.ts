import mongoose from 'mongoose';
import config from '@/configs/mongo.config';

const dbConnection = `mongodb+srv://${config.db.dbUserName}:${config.db.dbPassword}@${config.db.dbName}.r3wrt.mongodb.net/?retryWrites=true&w=majority&appName=${config.db.dbName}`;
class Database {
  constructor() {
    this.connect();
  }

  public static instance: Database;

  connect(type = 'mongo') {
    switch (type) {
      case 'mongo':
        mongoose
          .connect(dbConnection)
          .then(() => {
            console.log('Connected to MongoDB');
          })
          .catch((error) => {
            console.log('Error connecting to MongoDB');
            console.error(error);
          });
        break;
      case 'mysql':
        break;
      default:
        break;
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
export default instanceMongodb;
