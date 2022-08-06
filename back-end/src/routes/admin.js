import express from "express";
import {adminController} from "../controlers/admin.controler.js";
import { authMiddlevare } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.get("/getAllUsers", authMiddlevare, async (req, res, next) =>
    adminController.getAll(req, res).catch(next)
);

router.delete("/:id", authMiddlevare, async (req, res, next) => {
    adminController.deleteOne(req, res).catch(next)
})

router.put("/:id", authMiddlevare, async (req, res, next) =>
    adminController.updateUser(req, res).catch(next)
);

export default router;