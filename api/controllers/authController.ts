import { Request, Response } from "express";
import admin from "firebase-admin";

export const sessionLogin = async (req: Request, res: Response) => {
  
  const idToken = req.body.token;
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  try {
    console.log("Received ID Token for sessionLogin:", idToken);
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

    console.log("Session cookie created:", sessionCookie);

    res.cookie("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    res.status(200).send({ status: "success" });
  } catch (error) {
    console.error("Failed to create session cookie:", error, "Token:", idToken);
    res.status(401).send("UNAUTHORIZED");
  }
};

export const sessionLogout = async (req: Request, res: Response) => {
  try {
    // Clear the session cookie
    res.clearCookie("session", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    res.status(200).send({ status: "success" });
  } catch (error) {
    console.error("Failed to clear session cookie:", error);
    res.status(500).send("INTERNAL_SERVER_ERROR");
  }
};