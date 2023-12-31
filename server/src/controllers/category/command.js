import AppError from "../../utils/app-error.js"
import Categorys from "./repositories.js"
import QueryCategory from "./query.js"

export default class CommandCategory {
  constructor() {
    this.category = new Categorys()
    this.query = new QueryCategory()
  }

  async addCategory(payload) {
    const { name } = payload
    const data = {
      category: name,
    }

    await this.category.insertOneCategory(data)
  }

  async updateCategory(payload, CategoryId) {
    const { name } = payload
    const params = { where: { id: CategoryId } }
    const getCategory = await this.query.getCategoryById(CategoryId)
    const dataCategory = getCategory.dataValues

    let updateData = {}
    if (dataCategory.category !== name) {
      updateData.category = name
    }
    await this.category.updateOneCategory(updateData, params)
  }

  async deleteCategory(CategoryId) {
    const params = { where: { id: CategoryId } }
    await this.category.deleteOneCategory(params)
  }
}
