import { getGallery } from "../../controllers/homepageController";

const express = require("express");

const router = express.Router();

router.get("/gallery", getGallery);

export default router;