import { AllowNull, Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  freezeTableName: true,
  underscored: true,
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['email'],
    },
  ],
})
export class User extends Model<User> {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID,
  })
  public id: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  public email: string;

  @AllowNull(false)
  @Column(DataType.STRING(100))
  public password: string;
}
