const express = require("express");
import { getUsers } from '../../controllers/userController';

const router = express.Router();

router.get("/getUsers", getUsers);

export default router;