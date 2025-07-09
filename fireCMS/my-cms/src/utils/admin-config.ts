const adminEmailString = import.meta.env.VITE_ADMIN_EMAILS || "";
export const ADMIN_EMAILS = adminEmailString.split(",").map((email: string) => email.trim());

export const isAdminEmail = (email: string): boolean => {
  return ADMIN_EMAILS.includes(email);
};