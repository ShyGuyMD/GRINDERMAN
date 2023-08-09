export interface User {
    username: string;
    password?: string;

    userId?: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export interface Client extends User {
    // Additional properties specific to the client
}

export interface Admin extends User {
    // Additional properties specific to the administrator
}
