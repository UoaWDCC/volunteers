export const ADMIN_EMAILS = [
  "volunteers@projects.wdcc.co.nz"
];

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email);
} 