// Admin configuration file
// Centralized management of admin email addresses

const adminEmailString = process.env.ADMIN_EMAILS || "";
export const ADMIN_EMAILS = adminEmailString.split(",").map(email => email.trim());

export const ADMIN_EMAILS_SET = new Set(ADMIN_EMAILS);

// Helper function to check if an email is admin
export const isAdminEmail = (email: string): boolean => {
  return ADMIN_EMAILS.includes(email);
};

// Helper function to get all admin emails
export function getAdminEmails(): string[] {
  return [...ADMIN_EMAILS];
}

// Helper function to add new admin email
export function addAdminEmail(email: string): void {
  if (!ADMIN_EMAILS_SET.has(email)) {
    ADMIN_EMAILS.push(email);
    ADMIN_EMAILS_SET.add(email);
  }
}

// Helper function to remove admin email
export function removeAdminEmail(email: string): void {
  if (ADMIN_EMAILS_SET.has(email)) {
    const index = ADMIN_EMAILS.indexOf(email);
    if (index > -1) {
      ADMIN_EMAILS.splice(index, 1);
      ADMIN_EMAILS_SET.delete(email);
    }
  }
} 