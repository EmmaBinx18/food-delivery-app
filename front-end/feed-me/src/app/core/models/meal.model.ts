export interface Meal {
    id: number;
    name: string;
    description: string;
    businessId: number;
    availabilityStatusId: number;
    price: number;
    minPrepareTime: number
}