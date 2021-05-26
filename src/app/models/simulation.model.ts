import { Product } from "./product.model";
import { Ingredient } from "./ingredient.model";
import { Customer } from "./customer.model";

export class Simulation {
  constructor(
    public customers: scenarioCustomer[],
    public ingredients: Ingredient[],
    public products: scenarioProduct[],
    public newCustomerFrequency: number,
    public receptions: scenarioReception[],
    public receptionTypes: scenarioReceptionType[],
    public workplaces: number,
    public deliveries: number
  ) {}
}

export interface scenarioCustomer {
  id: number;
  order: { id: number; products: number[] };
}
export interface scenarioProduct {
  id: number;
  productName: string;
  image: string;
  ingredients?: number[];
  delayTime?: number;
}

export interface scenarioReception {
  id: number;
  receptionTypeId: number;
}

export interface scenarioReceptionType {
  id: number;
  getOrderTime: number;
}
