// This file manages get, add, remove, modify user calls from frontend.

import axios from 'axios';

const apiUrl = 'http://localhost:3001';

// Fetch a user by ID
export const getUserById = async (userId: string) => {
    console.log("Get User By Id");
    try {
        const response = await axios.get(`${apiUrl}/api/getUsers`, {
        params: { id: userId }
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
        console
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
  };