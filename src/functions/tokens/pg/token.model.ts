import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { pgSequelize, connect } from "../../../config/pg-sequelize";
import { Token } from "../entity/token.entity";

export type TokenCreate = Optional<Token, 'id'>

class TokenModel extends Model<Token, TokenCreate> {
  public readonly created_at!: Date;
}

TokenModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  card_number: {
    allowNull: false,
    type: DataTypes.BIGINT
  },
  cvv: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  expiration_month: {
    allowNull: false,
    type: DataTypes.STRING
  },
  expiration_year: {
    allowNull: false,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING
  },
  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  token: {
    allowNull: false,
    type: DataTypes.STRING
  },
  expiration_token: {
    allowNull: false,
    type: DataTypes.DATE
  },
}, {
  sequelize: pgSequelize,
  tableName: 'token',
  timestamps: false
})

const getModel = async () => {
  await connect()

  await TokenModel.sync()

  return TokenModel
}

export {
  getModel
}