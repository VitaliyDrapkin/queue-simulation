import { Customer } from "./../../../models/customer.model";
import { Reception } from "./../../../models/reception.model";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-reception-item",
  templateUrl: "./reception-item.component.html",
  styleUrls: ["./reception-item.component.scss"],
})
export class ReceptionItemComponent implements OnInit {
  @Input() reception: Reception;
  customers: Customer[];
  constructor() {}

  ngOnInit(): void {
    this.customers = this.reception.customersInQueue;
  }
}
