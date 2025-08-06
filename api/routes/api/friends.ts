const express = require("express");
import { addFriend, getFriendsByUid, } from '../../controllers/friendsController';

const router = express.Router();

router.get("/:uid", getFriendsByUid);
router.post("/:uid", addFriend);

export default router;