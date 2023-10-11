import { DataTypes } from "sequelize"
import sequelize from "../config/db.js"

const Category = sequelize.define("category", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  category: { type: DataTypes.STRING },
})

export default Category
