import { db } from '../config/firebase';  // Import the Firestore database configuration
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, QuerySnapshot } from 'firebase/firestore';  // Import Firestore functions
import { Request, Response } from 'express';  // Import types for Express request and response objects


const colRef = collection(db, "Announcements");


export async function getAllAnnouncements(req: Request, res: Response): Promise<void> {
  const userDocs = await getDocs(colRef);  // Fetch all documents from the "Announcements" collection
  const announcements = userDocs.docs.map(doc => doc.data());  // Map the documents to their data

  res.json(announcements);  // Send the announcements data as JSON response

  // console.log(announcements);  // Uncomment to log announcements data for debugging
}


export async function getAllCurrentAnnouncements(req: Request, res: Response): Promise<void> {
  try {
    const currentLocalTime = new Date();  // Get the current local time

    const querySnapshot = await getDocs(colRef);  // Fetch all documents from the "Announcements" collection
    const announcements = querySnapshot.docs
      .filter((doc) => {
        const startDate = doc.data().start_date_time;
        const endDate = doc.data().end_date_time;
        // Check if the current time falls within the start and end dates
        return startDate.toDate() <= currentLocalTime && currentLocalTime <= endDate.toDate();
      })
      .map((doc) => doc.data());  // Map the filtered documents to their data

    console.log(announcements);  // Log announcements data for debugging

    res.json(announcements);  // Send the announcements data as JSON response
  } catch (error) {
    console.error('Error getting documents: ', error);  // Log any errors that occur
    res.status(500).json({ error: 'Failed to fetch announcements' });  // Send error response
  }
}


export async function getAnnouncementByUser(req: Request, res: Response): Promise<void> {
  try {
    const currentLocalTime = new Date();  // Get the current local time
    console.log(currentLocalTime);  // Log current local time for debugging

    const user = req.body.user;  // Extract user information from request body
    console.log(user);  // Log user information for debugging

    const querySnapshot = await getDocs(colRef);  // Fetch all documents from the "Announcements" collection
    const announcements = querySnapshot.docs
      .filter((doc) => {
        const startDate = doc.data().start_date_time;
        const endDate = doc.data().end_date_time;

        // console.log('Start Date:', startDate.toDate(), 'End Date:', endDate.toDate(), 'Current Time:', currentLocalTime);
        return startDate.toDate() <= currentLocalTime && currentLocalTime <= endDate.toDate();  // Check if the current time falls within the start and end dates
      })
      .filter((doc) => {
        // Get the filters array from the announcement
        const filters = doc.data().Filters;
        const userYearOfStudy = user.yearOfStudy;  // Get the user's year of study

        // Check if announcement filters include "All" which is always relevant
        if (filters.includes("All")) {
          return true;
        }

        /** We can either do this or in the create announcement form if under-graduate is selected for a filter we can add all years 1-4 and would only need the check following this one */
        if (filters.includes("UnderGrad")) {
          if (userYearOfStudy != "PostGrad" && userYearOfStudy != "Other") {
            return true;
          }
        }

        // Check if the user's year of study matches any of the filters
        if (filters.includes(userYearOfStudy)) {
          return true;
        }

        return false;
      })
      .map((doc) => doc.data());  // Map the filtered documents to their data

    console.log(announcements);  // Log announcements data for debugging

    res.json(announcements);  // Send the announcements data as JSON response
  } catch (error) {
    console.error('Error getting documents: ', error);  // Log any errors that occur
    res.status(500).json({ error: 'Failed to fetch announcements' });  // Send error response
  }
}