const express = require("express");
import { getFriends, deleteFriend, } from '../../controllers/friendsController';

const router = express.Router();

// Add target friend id in request body (i.e. friend you want to remove etc.)

router.get("/:uid", getFriends);
router.delete("/:uid", deleteFriend);

export default router;