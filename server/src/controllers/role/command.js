import AppError from "../../utils/app-error.js";
import Roles from "./repositories.js";
import QueryRole from "./query.js";

export default class CommandRole {
  constructor() {
    this.role = new Roles();
    this.query = new QueryRole();
  }

  async addRole(payload) {
    const { role } = payload;
    const data = {
      role: role,
    };

    const checkRole = await this.query.getRole(role);
    if (checkRole) if (checkRole.dataValues.role === role) throw new AppError("Role has Already", 400);
    await this.role.insertOneRole(data);
  }
}
