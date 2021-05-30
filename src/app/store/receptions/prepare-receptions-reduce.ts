import { scenarioReceptionType } from "./../../models/ScenarioReceptionType.model";
import { scenarioReception } from "./../../models/ScenarioReception.model";
import { customerOrder } from "./../../models/CustomerOrder.model";
import { Customer } from "./../../models/Customer.model";
import { ReceptionStatuses } from "./../../enums/ReceptionStatuses";
import { Reception } from "./../../models/reception.model";

interface payload {
  customers: Customer[];
  receptions: scenarioReception[];
  receptionTypes: scenarioReceptionType[];
  newCustomerFrequency: number;
}

export function prepareReception(state, payload: payload) {
  const newCustomers: Customer[] = payload.customers.map((customer) => {
    return new Customer(
      customer.id,
      new customerOrder(
        customer.customerOrder.id,
        customer.customerOrder.productsIds
      ),
      customer.name
    );
  });
  const receptions = payload.receptions.map((reception) => {
    const getOrderTime = payload.receptionTypes.filter(
      (receptionType) => reception.receptionTypeId === receptionType.id
    )[0].getOrderTime;

    return new Reception(
      reception.id,
      0,
      getOrderTime,
      [],
      false,
      ReceptionStatuses.Empty
    );
  });
  return {
    ...state,
    newCustomers: newCustomers,
    receptions: receptions,
    newCustomerFrequency: payload.newCustomerFrequency,
  };
}
