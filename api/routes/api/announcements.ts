// getAnnouncements
const express = require("express");
import { getAllCurrentAnnouncements, getAllAnnouncements, getAnnouncementByUser } from '../../controllers/announcementController'

const router = express.Router();

router.get("/getAllCurrentAnnouncements", getAllCurrentAnnouncements);
router.get("/getAllAnnouncements", getAllAnnouncements);
router.post("/getAnnouncementByUser", getAnnouncementByUser);

export default router;