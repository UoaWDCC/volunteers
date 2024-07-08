// Complete in Issue

import { useState } from "react";

function StaffAuth() {

    const [isStaff, setAsStaff] = useState(false);

    function checkIfStaff(email: string) {
        const splitEmail = email.split("@");
        const emailDomain = splitEmail[1];
    
        return emailDomain === "auckland.ac.nz"; // Add check for specific volunteering admin email
      }
    
    
    return isStaff;
}

export default StaffAuth;