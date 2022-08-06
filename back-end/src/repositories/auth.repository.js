import { Users } from "../models/user.model.js";
import { logger } from "../utils/logger.js";
import {HTTPError} from "../utils/HttpError.js";


class AuthRepository {
  async create({ firstName, lastName, email, password, dateOfBirth }) {
    logger.info(`AuthRepository. Got create User request`);
    const user = new Users({
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
    });
    return user.save();
  }
  async findOneByEmail(email) {
    logger.info(`AuthRepository. FindOneByEmail request`);
    return Users.findOne({ email });
  }
  async findOneById(id) {
    logger.info(`AuthRepository. findOneById request ${id}`);
    return Users.findOne({ _id: id });
  }
  async getCount() {
    return Users.countDocuments();
  }

  async getOwnUserById(id, user) {
    const usr = await Users.findOne({
      $and: [{ _id: id }, { owner: user._id }],
    });
    if (!usr) {
      throw new HTTPError("NotFound", 404);
    }
    return usr;
  }

  async getAll({ limit, page }) {
    logger.info(`AuthRepository. Get all users`)
    const users = await Users.find()
        .skip(limit * page)
        .limit(limit)
    return users;
  }

  async deleteOne(id) {
    return Users.deleteOne({ _id: id });
  }

  async updateUser(id, user) {
    logger.info(`UserRepository. Update user request id=${id}`, { user });
    return Users.findByIdAndUpdate(id, user, { new: true });
  }
}

export const authRepository = new AuthRepository();
