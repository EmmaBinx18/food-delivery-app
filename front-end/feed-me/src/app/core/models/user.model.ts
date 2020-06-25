import { Role } from "./role.model";

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