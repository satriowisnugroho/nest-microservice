import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';

const tableOptions: IDefineOptions = {
  timestamp: true,
  tableName: 'users',
} as IDefineOptions;

@Table(tableOptions)
export default class User extends Model<User> {
  @Column({
    type: DataType.NUMERIC,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column
  public name: string;

  @Column
  public email: string;

  @Column
  public username: string;
}