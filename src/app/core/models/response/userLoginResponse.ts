import { ApiBodyResponse } from "./apiBodyResponse";

export interface UserLoginResponse extends ApiBodyResponse {
    user_id: string;
    first_name: string;
    last_name: string;
    display_name: string;
    role: string;
    email: string;
    extras: Extras;
    dev_note: string;
}

export interface Extras {
    jwt_token: string;
}