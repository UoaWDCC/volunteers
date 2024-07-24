const express = require("express");
import { getUsers, addUser, deleteUser, getUser, updateUser } from '../../controllers/userController';

const router = express.Router();

router.get("/getUsers", getUsers);
router.post("/addUser", addUser);
router.delete("/removeUser", deleteUser);
router.post("/getUser", getUser);
router.patch("/updateUser", updateUser);

export default router;