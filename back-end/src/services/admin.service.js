import {authRepository} from "../repositories/auth.repository.js";
import {logger} from "../utils/logger.js";
import { HTTPError } from "../utils/HttpError.js";

class AdminService {
    async getAllUsers({ limit = 10, page = 0 }, user) {
        page = page > 0 ? page : 0;
        logger.info(`AdminService. Got get ALL users request`, { limit, page });
        const [users, total] = await Promise.all([
            authRepository.getAll({limit, page}, user._id),
            authRepository.getCount()
        ]);
        return {
            data: users.map((user) => user.getPublicUsers()),
            limit,
            page: page + 1,
            total,
        };
    }

    async deleteOne(id, user) {
        const usr = await authRepository.getOwnUserById(id, user);
        if (!usr) {
            logger.warn(
                "AdminService. User not found or user dont have access to edit it"
            );
            throw new HTTPError("Notfound", 404);
        }
        return authRepository.deleteOne(id);
    }

    async updateUser({ id, userData, user }) {
        logger.info(`UserService. Got update user request ${id}`);
        const usr = await authRepository.getOwnUserById(id, user);
        if (!usr) {
            logger.warn(
                "UserService. Todo not found or user dont have access to edit it"
            );
            throw new HTTPError("Not Found", 404);
        }
        logger.info(`UserService. Got user from DB ${id}`);

        logger.info(`UserService. Update user data ${userData}`);
        const newUser = await authRepository.updateUser(id, userData);
        logger.info(`UserService. User updated ${id} ${newUser}`);

        return newUser.getPublicUsers();
    }
}

export const adminService = new AdminService()