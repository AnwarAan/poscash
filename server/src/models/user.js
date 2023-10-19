import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  fullname: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  phone_number: { type: DataTypes.STRING, defaultValue: "" },
  birthdate: { type: DataTypes.STRING, defaultValue: "" },
  image_url: { type: DataTypes.STRING, defaultValue: "" },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_status: { type: DataTypes.TEXT, defaultValue: "disabled"}
});

export default User;
