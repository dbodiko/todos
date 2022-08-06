import { logger } from "../utils/logger.js";
import {adminService} from "../services/admin.service.js";
import {HTTPError} from "../utils/HttpError.js";


class AdminController {
    constructor(service, logger) {
        this.service = service;
        this.log = logger;
    }

    async getAll(req, res) {
        logger.info(`Got getAll request`)
        if (req.user.isAdmin()) {
            let {page, limit} = req.query
            if (page) {
                page = parseInt(page);
            }
            if (limit) {
                limit = parseInt(limit);
            }

            const users = await adminService.getAllUsers({page, limit}, req.user)
            res.json(users)
        } else {throw new HTTPError("Forbidden", 403);}
    }

    async deleteOne(req, res) {
        const id = req.params.id;
        this.log.info("Got delete one user request", { id: `${id}` });
        await this.service.deleteOne(id, req.user);
        res.json();
    }

    async updateUser(req, res) {
        const id = req.params.id;
        const user = req.body;
        console.log(`---------------------------------- ${id}`)
        this.log.info("Got update user request", { id, user });

        const newUser = await this.service.updateUser({
            id,
            userData: user,
            user: req.user,
        });
        this.log.info("Got updated user", { id, newUser });

        res.json(newUser);
    }

}

export const adminController = new AdminController(adminService, logger);


