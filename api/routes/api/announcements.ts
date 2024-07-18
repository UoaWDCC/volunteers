// getAnnouncements
const express = require("express");
import { getAllAnnouncements } from '../../controllers/announcementController'

const router = express.Router();

router.get("/getAllAnnouncements", getAllAnnouncements);

export default router;