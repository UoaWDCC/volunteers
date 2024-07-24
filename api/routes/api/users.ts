const express = require("express");
import { getUsers, addUser, deleteUser, getUser, updateUser } from '../../controllers/userController';

const router = express.Router();

router.get("/", getUsers);
router.post("/", addUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser)
router.patch("/:id", updateUser)


export default router;