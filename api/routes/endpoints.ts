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
import newsletterEndpoints from './api/newsletter';

import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { json } from "stream/consumers";
import * as admin from "firebase-admin";

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

// Auth: verify ID token and return user role from Firestore
router.get("/auth/me", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization || "";
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ error: "Missing or invalid Authorization header" });
    }
    const idToken = parts[1];

    const decoded = await admin.auth().verifyIdToken(idToken);
    const uid = decoded.uid;

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", uid));
    const snap = await getDocs(q);
    if (snap.empty) {
      return res.status(404).json({ error: "User not found" });
    }
    const userData = snap.docs[0].data() as any;
    return res.status(200).json({ uid, role: userData?.role || "volunteer" });
  } catch (err) {
    console.error("/auth/me error", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
});


// Endpoints
router.use("/users", userEndpoints);
router.use("/events", eventEndpoints);
router.use("/announcements", announcementEndpoints);
router.use("/homepage", homepageEndpoints); 
router.use('/email', emailEndpoints);
router.use('/newsletter', newsletterEndpoints);

export default router;

module.exports = router;

