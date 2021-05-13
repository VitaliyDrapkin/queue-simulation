import { Product } from "./product.model";
import { Ingredient } from "./ingredient.model";
import { Customer } from "./customer.model";

export class Simulation {
  constructor(
    public customers: [
      { id: number; order: { id: number; products: number[] } }
    ],
    public ingredients: Ingredient[],
    public products: {
      id: number;
      productName: string;
      image: string;
      ingredients: number[];
    }[],
    public newCustomerFrequency: number,
    public receptions: { id: number; receptionType: number }[],
    public receptionTypes: { getOrderTime: number }[],
    public workPlaces: number,
    public deliveries: number
  ) {}
}
