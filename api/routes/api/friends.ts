const express = require("express");
import { addFriend, deleteFriend, getFriendsByUid, } from '../../controllers/friendsController';

const router = express.Router();

router.get("/:uid", getFriendsByUid);
router.post("/:uid", addFriend);
router.delete("/:uid", deleteFriend);

export default router;