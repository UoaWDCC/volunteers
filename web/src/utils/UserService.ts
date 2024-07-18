// This file manages get, add, remove, modify user calls from frontend.

import axios from 'axios';

const apiUrl = 'http://localhost:3002';

// Fetch a user by ID
export const getUserById = async (userId: string) => {
    console.log("Get User By Id");
    try {
        const response = await axios.post(`${apiUrl}/api/getUser`, {
            id: userId
        });
        
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};


export const getAllUsers = async () => {
    console.log("Get all users");
    try {
        const response = await axios.get(`${apiUrl}/api/getUsers`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
  };

// leaving announcements in here until figure out how to have automatic url / port
export const getAnnouncements = async (user: any) => {
    console.log("Get Announcements");
    try {
        const response = await axios.post(`${apiUrl}/api/getAnnouncements`, {
            user: user
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};

export const getAllAnnouncements = async () => {
    console.log("Get Announcements");
    try {
        const response = await axios.get(`${apiUrl}/api/getAllAnnouncements`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};