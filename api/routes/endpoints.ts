"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
import { Request, Response } from "express";

import userEndpoints from './api/users';
import eventEndpoints from './api/events';
import announcementEndpoints from './api/announcements';
import homepageEndpoints from './api/homepage';
import emailEndpoints from './api/email';
import gmailEndpoints from './api/gmail';
import newsletterEndpoints from './api/newsletter';

import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { json } from "stream/consumers";

// Temp test to show that DB is working
router.get("/getTest", async (req: Request, res: Response) => {
  try {
    const testRef = collection(db, "test");
    const data = await getDocs(testRef);
    const itemList = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(itemList);
  } catch (error) {
    console.error("Error fetching items from test collection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Endpoints
router.use("/users", userEndpoints);
router.use("/events", eventEndpoints);
router.use("/announcements", announcementEndpoints);
router.use("/homepage", homepageEndpoints); 
router.use('/email', emailEndpoints);
router.use('/gmail', gmailEndpoints);
router.use('/newsletter', newsletterEndpoints);

export default router;

module.exports = router;

