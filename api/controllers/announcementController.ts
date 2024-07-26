import { db } from '../config/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc, QuerySnapshot } from 'firebase/firestore';
import { Request, Response } from 'express';


const colRef = collection(db, "Announcements");


export async function getAllAnnouncements(req: Request, res: Response): Promise<void> {
  const userDocs = await getDocs(colRef);
  const announcements = userDocs.docs.map(doc => doc.data());

  res.json(announcements);

  // console.log(announcements);
}


export async function getAllCurrentAnnouncements(req: Request, res: Response): Promise<void> {
  try {
    const currentLocalTime = new Date();

    const querySnapshot = await getDocs(colRef);
    const announcements = querySnapshot.docs
      .filter((doc) => {
        const startDate = doc.data().StartDate;
        const endDate = doc.data().EndDate;

        return startDate.toDate() <= currentLocalTime && currentLocalTime <= endDate.toDate();
      })
      .map((doc) => doc.data());

    console.log(announcements);

    res.json(announcements);
  } catch (error) {
    console.error('Error getting documents: ', error);
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
}


export async function getAnnouncementByUser(req: Request, res: Response): Promise<void> {
  try {
    const currentLocalTime = new Date();
    console.log(currentLocalTime);

    const user = req.body.user;
    console.log(user);

    const querySnapshot = await getDocs(colRef);
    const announcements = querySnapshot.docs
      .filter((doc) => {
        const startDate = doc.data().StartDate;
        const endDate = doc.data().EndDate;

        // console.log('Start Date:', startDate.toDate(), 'End Date:', endDate.toDate(), 'Current Time:', currentLocalTime);
        return startDate.toDate() <= currentLocalTime && currentLocalTime <= endDate.toDate();
      })
      .filter((doc) => {
        // get filters array
        const filters = doc.data().Filters;
        const userYearOfStudy = user.yearOfStudy;

        if (filters.includes("All")) {
          return true;
        }

        /** We can either do this or in the create announcement form if under-graduate is selected for a filter we can add all years 1-4 and would only need the check following this one */
        if (filters.includes("UnderGrad")) {
          if (userYearOfStudy != "PostGrad" && userYearOfStudy != "Other") {
            return true;
          }
        }

        if (filters.includes(userYearOfStudy)) {
          return true;
        }

        return false;
      })
      .map((doc) => doc.data());

    console.log(announcements);

    res.json(announcements);
  } catch (error) {
    console.error('Error getting documents: ', error);
    res.status(500).json({ error: 'Failed to fetch announcements' });
  }
}