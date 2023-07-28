import { UserRole } from "@shared/constants";

export interface User {
  email: string;
  password: string;
  role: UserRole;
}

export interface Client extends User {
  // Additional properties specific to the client
}

export interface Admin extends User {
  // Additional properties specific to the administrator
}
