// getAnnouncements
const express = require("express");
import { getAllAnnouncements, getAnnouncementByUser } from '../../controllers/announcementController'

const router = express.Router();

router.get("/getAllAnnouncements", getAllAnnouncements);
router.post("/getAnnouncementByUser", getAnnouncementByUser);

export default router;