export interface AppUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
  isActive?: boolean;
  createdOn?: string;
}