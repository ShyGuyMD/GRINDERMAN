import { UserRole } from '@shared/constants';
import { ApiBodyRequest } from './apiBodyRequest';

export interface CreateCustomerRequest extends ApiBodyRequest {
  email: string;
  password: string;
  role: UserRole;
  first_name?: string;
  last_name?: string;
  username?: string;
  billing?: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping?: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
}
