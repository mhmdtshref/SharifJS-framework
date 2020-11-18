import { Sequelize } from 'sequelize';

export class SequelizeConfig {
  sequelize: Sequelize;

  private underscored = false;
  private timestamps = true;
  private logging = false;

  constructor() {
    this.sequelize = new Sequelize('', this.getSequelizeOptions());
  }

  private getSequelizeOptions = () => {
    return {
      define: {
        underscored: this.underscored,
        timestamps: this.timestamps,
      },
      logging: this.logging,
    };
  };
}
