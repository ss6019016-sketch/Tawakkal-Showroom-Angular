export interface Customer {
  customerId?: number;
  tenantId?: number;

  firstName: string;
  lastName: string;
  fullName?: string;

  email: string;
  phone?: string;
  address?: string;

  status?: boolean;
  createdDate?: string;
}