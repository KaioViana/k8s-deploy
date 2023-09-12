import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";

class DatabaseConnection {
  private static instance: DatabaseConnection = null;
  private static sequelize: Sequelize;
  private models = [ProductModel];

  private constructor() {
    DatabaseConnection.sequelize = new Sequelize({
      dialect: 'mysql',
      dialectOptions: {
        host: process.env.PRODUCT_ADM_DB_HOST,
        port: process.env.PRODUCT_ADM_DB_PORT,
        database: process.env.PRODUCT_ADM_DB_NAME,
        user: process.env.PRODUCT_ADM_DB_USER,
        password: process.env.PRODUCT_ADM_DB_PASSWORD,
      },
    });
    DatabaseConnection.sequelize.addModels(this.models);
    this.initModels();
  }

  static getConnectionInstance() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.sequelize;
  }

  static async sync() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.sequelize.sync();
  }

  static async closeConnection() {
    if (DatabaseConnection.instance) {
      await DatabaseConnection.sequelize.drop();
      await DatabaseConnection.sequelize.close();
      DatabaseConnection.instance = null;
    }
  }

  private initModels() {
    this.models.forEach(model => model.initModel(DatabaseConnection.sequelize));
  }
}

export { DatabaseConnection } 
