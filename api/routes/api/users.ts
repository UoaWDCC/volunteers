const express = require("express");
import { getUsers, addUser, deleteUser } from '../../controllers/userController';

const router = express.Router();

router.get("/getUsers", getUsers);
router.post("/addUser", addUser);
router.delete("/removeUser", deleteUser);

export default router;