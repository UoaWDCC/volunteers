const express = require("express");
import { getFriends, deleteFriend, } from '../../controllers/friendsController';

const router = express.Router();

// Add target friend id in request body (i.e. friend you want to remove etc.)

router.get("/:uid", getFriends); // uid as in the user's uid in the users collection
router.delete("/:uid", deleteFriend);  // Requires a request body with the following arguments: { friend_id }

export default router;