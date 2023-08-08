import { ApiBodyRequest } from './apiBodyRequest';

export interface LoginRequest extends ApiBodyRequest {
    email: string;
    password: string;
}