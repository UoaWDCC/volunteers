const express = require("express");
import { getUsers, addUser } from '../../controllers/userController';

const router = express.Router();

router.get("/getUsers", getUsers);
router.get("/addUser", addUser);

export default router;