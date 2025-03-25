export type UserRole =
  | 'admin'
  | 'school_admin'
  | 'logistics_manager'
  | 'transport_manager'
  | 'canteen_manager'
  | 'parent'
  | 'student';

export interface UserMetadata {
  role: UserRole;
  firstName?: string;
  lastName?: string;
  class?: string; // For students
  children?: string[]; // For parents - array of student IDs
}