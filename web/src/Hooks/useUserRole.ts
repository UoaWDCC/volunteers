import { useState, useEffect } from 'react';
import { getUserById } from '../utils/UserService';

export const useUserRole = (userID: string | null) => {
    const [userRole, setUserRole] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    // just gets null user from getUserById, its like it is not waiting for database response?
    const fetchUserRole = async (id: string) => {
        try {
            setIsLoading(true);
            const data = await getUserById(id);
            setUserRole(data); // change to actually grab out the role
        } catch (error) {
            console.error('Error fetching user role:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (userID) {
            fetchUserRole(userID);
        }
    }, [userID]);

    return { userRole, isLoading };
};
