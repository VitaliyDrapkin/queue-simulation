import { mySchema } from "./scenarioJsonSchema";
import { Injectable } from "@angular/core";
import Ajv from "ajv";

@Injectable({
  providedIn: "root",
})
export class ValidationsService {
  constructor() {}

  isJsonValid(jsonFile: any): boolean {
    try {
      const parsedScenario = JSON.parse(jsonFile);
      return this.checkIfScenarioFieldsCorrect(parsedScenario);
    } catch (error) {
      return false;
    }
  }

  checkIfScenarioFieldsCorrect(jsonFile) {
    const ajv = new Ajv();
    try {
      const valid = ajv.validate(mySchema, jsonFile);
      return valid;
    } catch (error) {
      return false;
    }
  }
}
