import { Meal } from './meal.model';

export interface CartItem {
    meal: Meal,
    quantity: number
}