import { getAchievements, getGallery, getHighlights } from "../../controllers/homepageController";

const express = require("express");

const router = express.Router();

router.get("/gallery", getGallery);
router.get("/highlights", getHighlights);
router.get("/achievements", getAchievements);

export default router;