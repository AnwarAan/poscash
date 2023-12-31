import AppError from "../../utils/app-error.js";
import Users from "./repositories.js";

export default class QueryUser {
  constructor() {
    this.user = new Users();
  }

  async getUsers(query) {
    let params;
    const { roleId } = query;
    if (roleId) {
      params = {
        where: {
          roleId: roleId,
        },
      };
    }
    const result = await this.user.findManyUser(params);
    // if (result.length === 0) throw new AppError("Data Empty", 404);
    return result;
  }

  async getUserById(userId) {
    const params = { where: { id: userId } };
    const result = await this.user.findOneUser(params);
    // if (result === null) throw new AppError("User not Found", 404);
    return result;
  }

  async getUserByEmail(email) {
    const params = { where: { email: email } };
    const result = await this.user.findOneUser(params);
    return result;
  }

  async getUserByName(name) {
    const params = { where: { fullname: name } };
    const result = await this.user.findOneUser(params);
    return result;
  }
}
