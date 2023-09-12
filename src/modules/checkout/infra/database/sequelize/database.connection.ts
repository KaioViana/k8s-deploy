import { Sequelize, } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import { ProductModel } from "./product.model";
import { OrderModel } from "./order.model";

class DatabaseConnection {
  private static instance: DatabaseConnection = null;
  private static sequelize: Sequelize;
  private models = [OrderModel, ClientModel, ProductModel];

  private constructor() {
    DatabaseConnection.sequelize = new Sequelize({
      dialect: 'mysql',
      dialectOptions: {
        host: process.env.CHECKOUT_DB_HOST,
        port: process.env.CHECKOUT_DB_PORT,
        database: process.env.CHECKOUT_DB_NAME,
        user: process.env.CHECKOUT_DB_USER,
        password: process.env.CHECKOUT_DB_PASSWORD,
      }
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
      await DatabaseConnection.sequelize.close();
      DatabaseConnection.instance = null;
    }
  }

  private initModels() {
    this.models.forEach(model => model.initModel(DatabaseConnection.sequelize));
  }
}

export { DatabaseConnection } 
