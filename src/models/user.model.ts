import { DataTypes, Model, STRING } from 'sequelize';
import { IModel } from '../interfaces';
import { UserModelConstants, SequelizeConstant } from '../constants';

const userModelConstants = new UserModelConstants();
const { sequelize } = SequelizeConstant;

export class User extends Model implements IModel {
  id!: number;
  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;
  birthdate!: Date;

  className = 'User';
  pluralClassName = 'Users';
}

User.init(
  {
    firstName: {
      type: DataTypes.STRING(userModelConstants.nameMaxLength),
      allowNull: false,
      validate: {
        len: {
          args: [userModelConstants.nameMinLength, userModelConstants.nameMaxLength],
          msg: userModelConstants.firstName.lenError,
        },
      },
    },
    lastName: {
      type: DataTypes.STRING(userModelConstants.nameMaxLength),
      allowNull: false,
      validate: {
        len: {
          args: [userModelConstants.nameMinLength, userModelConstants.nameMaxLength],
          msg: userModelConstants.lastName.lenError,
        },
      },
    },
    email: {
      type: DataTypes.STRING(userModelConstants.emailMaxLength),
      allowNull: false,
      unique: {
        name: 'email',
        msg: userModelConstants.email.uniqueError,
      },
      validate: {
        len: {
          args: [userModelConstants.emailMinLength, userModelConstants.emailMaxLength],
          msg: userModelConstants.email.lenError,
        },
        isEmail: {
          msg: userModelConstants.email.isEmailError,
        },
      },
    },
    password: {
      type: STRING(1024),
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          args: true,
          msg: userModelConstants.birthdate.isDateError,
        },
      },
    },
  },
  { sequelize }
);
