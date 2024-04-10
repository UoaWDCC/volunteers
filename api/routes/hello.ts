const express = require("express");
const router = express.Router();
import { Request, Response } from "express";

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