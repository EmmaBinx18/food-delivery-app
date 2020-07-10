import { Address } from './address.model';

export interface Business {
    uid: string;
    businessName: string;
    category: string;
    address: Address
}