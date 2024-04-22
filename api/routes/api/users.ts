const express = require("express");
import { getUsers, addUser, deleteUser, getUser } from '../../controllers/userController';

const router = express.Router();

router.get("/getUsers", getUsers);
router.post("/addUser", addUser);
router.delete("/removeUser", deleteUser);
router.get("/getUser", getUser)

export default router;