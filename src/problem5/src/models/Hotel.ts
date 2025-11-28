import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";

interface HotelAttributes {
  id: number;
  name: string;
  country: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  is_available: boolean;
  images: string[];
  description: string;
  rating: number;
  created_at?: Date;
  updated_at?: Date;
}

interface HotelCreationAttributes
  extends Optional<HotelAttributes, "id" | "created_at" | "updated_at"> {}

class Hotel
  extends Model<HotelAttributes, HotelCreationAttributes>
  implements HotelAttributes
{
  public id!: number;
  public name!: string;
  public country!: string;
  public city!: string;
  public address!: string;
  public latitude!: number;
  public longitude!: number;
  public is_available!: boolean;
  public images!: string[];
  public description!: string;
  public rating!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Hotel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
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
    modelName: "Hotel",
    tableName: "hotels",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Hotel;
