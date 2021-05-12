import { Product } from "./product.model";
import { Ingredient } from "./ingredient.model";
import { Customer } from "./customer.model";
export class Simulation {
  constructor(
    public customers: Customer[],
    public Ingredients: Ingredient[],
    public Products: Product[],
    public newCustomerFrequency: number,
    public receptions: number[],
    public receptionsTypes: { getOrderTime: number }[],
    public workPlaces: number,
    public deliveries: number
  ) {}
}
