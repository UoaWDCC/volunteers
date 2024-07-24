const express = require("express");
import { getEvents, addEvent, deleteEvent, getEvent, updateEvent } from '../../controllers/eventController';

const router = express.Router();

router.get("/", getEvents);
router.post("/", addEvent);
router.delete("/:id", deleteEvent);
router.get("/:id", getEvent);
router.patch("/:id", updateEvent);

export default router;