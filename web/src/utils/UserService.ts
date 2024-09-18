// This file manages get, add, remove, modify user calls from frontend.

/*
Main idea of this file is to make API calls to the backend to get, add, remove, modify user data.

Currently, this file has both user, and announcement related API calls. This should be separated in the future.

Within frontend, instead of calling axios directly, we should call these functions to make API calls.

This will allow a more organized and clean codebase.  It will also allow for the apiUrl to me more easily managed as it dynamically changes based on the environment.
*/




import axios from 'axios';

// TODO: Should be dynamic, relative to the current environment / proxy
const apiUrl = 'http://localhost:3000';

// Fetch a user by ID
export const getUserById = async (userId: string) => {
    console.log("Get User By Id");
    try {
        const response = await axios.get(`${apiUrl}/api/users/${userId}`)
        
        return response.data;
    } catch (error) {
        console.error('Error fetching user');
        throw error;
    }
};


export const getAllUsers = async () => {
    console.log("Get all users");
    try {
        const response = await axios.get(`${apiUrl}/api/getUsers`);
        // console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching all users');
        throw error;
    }
  };

// leaving announcements in here until figure out how to have automatic url / port
export const getAnnouncementByUser = async (user: any) => {
    console.log("Get Announcements", user);
    try {
        const response = await axios.post(`${apiUrl}/api/announcements/getAnnouncementByUser`, {
            user
        });
        // console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching all users');
        throw error;
    }
};

export const getAllAnnouncements = async () => {
    console.log("Get Announcements");
    try {
        const response = await axios.get(`${apiUrl}/api/announcements/getAllAnnouncements`);
        // console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching all users');
        throw error;
    }
};