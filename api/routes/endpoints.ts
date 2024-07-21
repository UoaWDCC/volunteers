"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
import { Request, Response } from "express";

import userEndpoints from './api/users';

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

// Collection reference
const colRef = collection(db, "events");

// User entity endpoints
router.use("/", userEndpoints);


// testing routers

// get all events
router.get("/", async (request: Request, response: Response) => {
  getDocs(colRef)
    .then((snapshot) => {
      let events: any = [];
      snapshot.docs.forEach((doc) => {
        events.push({ ...doc.data(), id: doc.id });
      });
      response.json(events);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// get a single one
router.get("/:id", async (request: Request, response: Response) => {
  const eventRef = doc(db, "events", request.params.id)
  const event = (await getDoc(eventRef)).data()
  response.status(200).json(event)
});

// post a single one
router.post("/", async (request: Request, response: Response) => {
    const newEvent = await addDoc(colRef, request.body)
    response.json(newEvent.id)
  }
)

// delete a single one
router.delete("/:id", async (request: Request, response: Response) => {
    const docRef = doc(db, "events", request.body.id);
    const userDelete = await deleteDoc(docRef)
    response.json(userDelete)
});

// update a single one
router.patch("/:id", (request: Request, response: Response) => {
  response.json({ message: "'/:id' is working to UPDATE a single one" });
});

module.exports = router;

