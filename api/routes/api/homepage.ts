import { getGallery, getHighlights } from "../../controllers/homepageController";

const express = require("express");

const router = express.Router();

router.get("/gallery", getGallery);
router.get("/highlights", getHighlights);

export default router;