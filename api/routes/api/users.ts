const express = require("express");
import { getUsers, addUser, deleteUser, getUser, updateUser, getUserByUid, uploadProfilePicture } from '../../controllers/userController';
import multer from 'multer';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit (adjust as needed)
  },
});

router.get("/", getUsers);
router.post("/", addUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser)
router.patch("/:id", updateUser)
router.patch("/:id/image", upload.single('profile_picture'), uploadProfilePicture);

// maybe this route is bad but it checks for a user by their uid in firestore instead of document id
router.get("/uid/:uid", getUserByUid);

export default router;