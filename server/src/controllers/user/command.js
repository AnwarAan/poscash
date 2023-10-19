import AppError from "../../utils/app-error.js";
import bcrypt from "../../helpers/bcrypt.js";
import jwt from "jsonwebtoken";
import mailer from "../../helpers/mailer.js";
import crypto from "../../helpers/crypto.js";
import Users from "./repositories.js";
import QueryUser from "./query.js";
import fs from "fs";

export default class CommandUser {
  constructor() {
    this.user = new Users();
    this.query = new QueryUser();
  }

  async register(payload) {
    const { fullname, email, password, roleId } = payload;
    const pwd = await bcrypt.generateHash(password);
    const imageURL = `https://robohash.org/${fullname}`;
    const data = {
      fullname: fullname,
      email: email,
      password: pwd,
      image_url: imageURL,
      roleId: 2,
    };
    const checkUser = await this.query.getUserByEmail(email);
    if (checkUser !== null) throw new AppError("Email Already Exist", 403);
    await this.user.insertOneUser(data);
  }

  async loginCashier(payload) {
    const { fullname, password } = payload;
    const checkUser = await this.query.getUserByName(fullname);
    if (checkUser === null) throw new AppError("User not Found", 404);
    const dataUser = checkUser.dataValues;
    const checkPwd = await bcrypt.compareHash(password, checkUser.dataValues.password);
    if (dataUser.is_status === "disabled") throw new AppError("You need to enable cashier first", 401)
    if (!checkPwd) throw new AppError("Password not Match", 401);
    const data = { id: dataUser.id };
    const key = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1d" });
    const token = await crypto.encryptAES(key);
    const userData = {
      id: checkUser.id,
      token,
    };
    return userData;
  }

  async loginAdmin(payload) {
    const { fullname, password } = payload;
    console.log(payload);
    const checkUser = await this.query.getUserByName(fullname);
    if (checkUser === null) throw new AppError("User not Found", 404);
    const dataUser = checkUser.dataValues;
    const checkPwd = await bcrypt.compareHash(password, checkUser.dataValues.password);
    if (!checkPwd) throw new AppError("Password not Match", 401);
    const data = { id: dataUser.id };
    const key = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1d" });
    const token = await crypto.encryptAES(key);
    const userData = {
      id: dataUser.id,
      role: dataUser.roleId,
      token,
    };
    return userData;
  }

  async uploadImage(file, userId) {
    const params = { where: { id: userId } };
    const getUser = await this.query.getUserById(userId);
    let updateData = {};
    const imageUrl = `${process.env.HOST}/${file.filename}`;
    if (getUser.dataValues.image_url !== imageUrl) {
      updateData.image_url = imageUrl;
    }
    const path = getUser.dataValues.image_url.substring(22);
    fs.unlink(`public/${path}`, (err) => {
      if (err) console.log(err);
    });
    await this.user.updateOneUser(updateData, params);
  }

  async updateUser(payload, userId) {
    const params = { where: { id: userId } };
    const getUser = await this.query.getUserById(userId);

    // console.log(getUser.dataValues, "this is the value");
    const dataUser = getUser.dataValues;
    const { fullname, email, is_status, phone_number, birthdate } = payload;
    console.log(dataUser.fullname);
    let updateData = {};
    if (dataUser.fullname !== fullname) {
      updateData.fullname = fullname;
    }
    if (dataUser.email !== email) {
      updateData.email = email;
    }
    if (dataUser.phone_number !== phone_number) {
      updateData.phone_number = phone_number;
    }
    if (dataUser.birthdate !== birthdate) {
      updateData.birthdate = birthdate;
    } if (dataUser.is_status !== is_status) {
      updateData.is_status = is_status;
    }

    console.log(updateData);
    await this.user.updateOneUser(updateData, params);
  }

  async resetPassword(payload) {
    const { email } = payload;
    const getUser = await this.query.getUserByEmail(email);
    if (getUser === null) throw new AppError("Email not Found", 404);
    const token = await bcrypt.generateHash(String(getUser.dataValues.id));
    const link = `${process.env.CLIENT_LINK}/reset-password?token=${token}&userId=${getUser.dataValues.id}`;
    mailer.resetPassword(link, email);
  }

  async updateResetPassword(payload) {
    const { newPassword, confirmPassword, token, userId } = payload;
    const getUser = await this.query.getUserById(userId);
    const params = { where: { id: userId } };
    const userData = getUser.dataValues;

    const validateToken = await bcrypt.compareHash(String(userData.id), token);
    if (!validateToken) throw new AppError("Invalid Token", 403);

    if (validateToken) {
      if (newPassword !== confirmPassword) throw new AppError("Password not Match", 403);
      if (newPassword || confirmPassword) {
        if (newPassword === confirmPassword) {
          const password = await bcrypt.generateHash(newPassword);
          const updateData = { password: password };
          await this.user.updateOneUser(updateData, params);
        }
      }
    }
  }

  async deleteUser(userId) {
    const params = { where: { id: userId } };
    await this.user.deleteOneUser(params);
  }
}
