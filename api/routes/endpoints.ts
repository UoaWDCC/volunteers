"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
import { Request, Response } from "express";


import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Temp test to show that DB is working
router.get("/getTest", async (req: Request, res: Response) => {
    try {
        const testRef = collection(db, "test");
        const data = await getDocs(testRef);
        const itemList = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(itemList);
    } catch (error) {
        console.error("Error fetching items from test collection:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// testing routers

// get all
router.get("/", (request: Request, response: Response) => {
 response.json({ message: "'/' is working to GET ALL" });
});

// get a single one
router.get("/:id", (request: Request, response: Response) => {
 response.json({ message: "'/:id' is working to GET a SINGLE one" });
});

// post a single one
router.post("/", (request: Request, response: Response) => {
 response.json({ message: "'/:id' is working to POST a single one" });
});

// delete a single one
router.delete("/:id", (request: Request, response: Response) => {
 response.json({ message: "'/:id' is working to DELETE a single one" });
});

// update a single one
router.patch("/:id", (request: Request, response: Response) => {
 response.json({ message: "'/:id' is working to UPDATE a single one" });
});





module.exports = router;