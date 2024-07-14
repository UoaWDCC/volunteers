// This file manages get, add, remove, modify user calls from frontend.

import axios from 'axios';

// Fetch a user by ID
export const getUserById = async (userId: string) => {
    console.log("Get User By Id");
    try {
        const response = await axios.get('/getUser', {
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
        const response = await axios.get('/getUsers');
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
  };