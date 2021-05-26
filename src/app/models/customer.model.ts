export class Customer {
  constructor(public id: number, public customerOrder: customerOrder) {}
}

export class customerOrder {
  constructor(public id: number, public productsIds: number[]) {}
}
