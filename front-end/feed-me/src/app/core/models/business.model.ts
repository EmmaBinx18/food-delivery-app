import { Province } from './province.enum';

export interface Business {
    uid: string;
    businessName: string;
    category: string;
    street: string;
    suburb: string;
    complex?: string;
    zipcode: number;
    city: string;
    province: Province;
    country: string;
}