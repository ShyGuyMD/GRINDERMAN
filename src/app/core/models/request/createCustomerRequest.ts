import { UserRole } from '@shared/constants';
import { ApiBodyRequest } from './apiBodyRequest';
import { BillingAddress, ShippingAddress } from '../address';

export interface CreateCustomerRequest extends ApiBodyRequest {
  email: string;
  password: string;
  role: UserRole;
  first_name?: string;
  last_name?: string;
  username?: string;
  billing?: BillingAddress;
  shipping?: ShippingAddress;
}
