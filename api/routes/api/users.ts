const express = require("express");
import { getUsers, addUser, deleteUser, getUser, updateUser, getUserByUid } from '../../controllers/userController';

const router = express.Router();

router.get("/", getUsers);
router.post("/", addUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser)
router.patch("/:id", updateUser)

// maybe this route is bad but it checks for a user by their uid in firestore instead of document id
router.get("/uid/:uid", getUserByUid);

export default router;