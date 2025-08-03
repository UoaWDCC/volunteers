const express = require("express");
import { getFriendsByUid, } from '../../controllers/friendsController';

const router = express.Router();

router.get("/:uid", getFriendsByUid);

export default router;