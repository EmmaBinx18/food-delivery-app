import { Role } from "./role.enum";

export interface User {
    uid: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    password?: string;
    confirmPassword?: string;
    role: Role;
}