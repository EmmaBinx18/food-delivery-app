import { Province } from './province.enum';

export interface Address {
    street: string;
    suburb: string;
    complex?: string;
    zipcode: number;
    city: string;
    province: Province;
    country: string;
}