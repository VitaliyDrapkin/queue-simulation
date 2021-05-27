import { scenarioReceptionType } from "./ScenarioReceptionType.model";
import { scenarioReception } from "./ScenarioReception.model";
import { scenarioProduct } from "./ScenarioProduct.model";
import { Ingredient } from "./ingredient.model";
import { Customer } from "./Customer.model";

export class Scenario {
  constructor(
    public customers: Customer[],
    public ingredients: Ingredient[],
    public products: scenarioProduct[],
    public newCustomerFrequency: number,
    public receptions: scenarioReception[],
    public receptionTypes: scenarioReceptionType[],
    public workplaces: number,
    public deliveries: number
  ) {}
}
