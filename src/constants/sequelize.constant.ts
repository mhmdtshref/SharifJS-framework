import { Sequelize } from 'sequelize';
import { EnvConstants } from '../constants';

const { url } = new EnvConstants().database;
export class SequelizeConstant {
  static readonly underscored: boolean = false;
  static readonly timestamps: boolean = true;
  static readonly logging: boolean = false;
  static readonly databaseUrl: string = url as string;
  static readonly options = {
    define: {
      underscored: SequelizeConstant.underscored,
      timestamps: SequelizeConstant.timestamps,
    },
    logging: SequelizeConstant.logging,
  };

  static readonly sequelize = new Sequelize(SequelizeConstant.databaseUrl, SequelizeConstant.options);
}
