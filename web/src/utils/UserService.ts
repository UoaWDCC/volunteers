// This file manages get, add, remove, modify user calls from frontend.

import axios from "axios";

const appUrl = import.meta.env.VITE_API_URL;

// Fetch a user by ID
export const getUserById = async (userId: string) => {
  console.log("Get User By Id");
  try {
    const response = await axios.get(`${appUrl}/api/users/${userId}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching user");
    throw error;
  }
};

export const getAllUsers = async () => {
  console.log("Get all users");
  try {
    const response = await axios.get(`${appUrl}/api/getUsers`);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users");
    throw error;
  }
};

// leaving announcements in here until figure out how to have automatic url / port
export const getAnnouncementByUser = async (user: any) => {
  console.log("Get Announcements", user);
  try {
    const response = await axios.post(
      `${appUrl}/api/announcements/getAnnouncementByUser`,
      {
        user,
      }
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users");
    throw error;
  }
};

export const getAllAnnouncements = async () => {
  console.log("Get Announcements");
  try {
    const response = await axios.get(
      `${appUrl}/api/announcements/getAllAnnouncements`
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users");
    throw error;
  }
};
