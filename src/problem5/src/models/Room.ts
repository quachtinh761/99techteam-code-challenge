import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";

interface RoomAttributes {
  id: number;
  hotel_id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  is_available: boolean;
  created_at?: Date;
  updated_at?: Date;
}

interface RoomCreationAttributes
  extends Optional<RoomAttributes, "id" | "created_at" | "updated_at"> {}

class Room
  extends Model<RoomAttributes, RoomCreationAttributes>
  implements RoomAttributes
{
  public id!: number;
  public hotel_id!: number;
  public name!: string;
  public type!: string;
  public description!: string;
  public price!: number;
  public is_available!: boolean;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "hotels",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Room",
    tableName: "rooms",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Room;
