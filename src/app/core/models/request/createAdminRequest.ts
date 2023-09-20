import { UserRole } from '@shared/constants';
import { ApiBodyRequest } from './apiBodyRequest';

export interface CreateAdminRequest extends ApiBodyRequest {
  username: string;
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
  roles: UserRole[];
}
