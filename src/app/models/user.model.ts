export interface AppUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
    role?: string;
  isActive?: boolean;
  createdOn?: string;
}